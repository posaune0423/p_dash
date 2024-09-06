#!/bin/bash
set -euo pipefail
pushd $(dirname "$0")/..

export TARGET=${1:-"manifests/$SCARB_PROFILE/deployment"}
export STARKNET_RPC="http://localhost:5050/"

MANIFEST=$TARGET/manifest.json

declare "WORLD_ADDRESS"=$(cat $MANIFEST | jq -r '.world.address')

declare "CORE_ACTIONS"=$(cat manifests/dev/deployment/manifest.json | jq -r '.contracts[] | select(.tag=="pixelaw-actions") | .address')
declare "PAINT_ACTIONS"=$(cat manifests/dev/deployment/manifest.json | jq -r '.contracts[] | select(.tag=="pixelaw-paint_actions") | .address')
declare "SNAKE_ACTIONS"=$(cat manifests/dev/deployment/manifest.json | jq -r '.contracts[] | select(.tag=="pixelaw-snake_actions") | .address')
declare "P_DASH_ACTIONS"=$(cat manifests/dev/deployment/manifest.json | jq -r '.contracts[] | select(.tag=="p_dash-actions") | .address')

## Set RPC_URL with default value
#RPC_URL="http://localhost:5050"

# Check if a command line argument is supplied
if [ $# -gt 0 ]; then
    # If an argument is supplied, use it as the RPC_URL
    RPC_URL=$1
fi

# make sure all components/systems are deployed
CORE_MODELS=("pixelaw-App" "pixelaw-AppName" "pixelaw-CoreActionsAddress" "pixelaw-Pixel" "pixelaw-Permissions" "pixelaw-QueueItem" "pixelaw-Snake" "pixelaw-Instruction")
SNAKE_MODELS=("pixelaw-Snake" "pixelaw-SnakeSegment")
P_DASH_MODELS=("p_dash-Block" "p_dash-BlockType" "p_dash-Stage" "p_dash-StageId")

echo "Write permissions for CORE_ACTIONS"
for model in ${CORE_MODELS[@]}; do
    sleep 0.1
    sozo --profile $SCARB_PROFILE auth grant writer model:$model,$CORE_ACTIONS
done
echo "Write permissions for CORE_ACTIONS: Done"

echo "Initialize CORE_ACTIONS : $CORE_ACTIONS"
sleep 0.1
sozo --profile $SCARB_PROFILE execute $CORE_ACTIONS init
echo "Initialize CORE_ACTIONS: Done"

echo "Initialize P_DASH_ACTIONS: Done"
sleep 0.1
sozo --profile $SCARB_PROFILE execute $P_DASH_ACTIONS init
echo "Initialize P_DASH_ACTIONS: Done"

echo "Write permissions for P_DASH_ACTIONS"
sleep 0.1
sozo --profile $SCARB_PROFILE auth grant writer model:pixelaw-Pixel,$P_DASH_ACTIONS
echo "Write permissions for P_DASH_ACTIONS: Done"