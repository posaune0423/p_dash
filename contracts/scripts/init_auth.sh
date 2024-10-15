#!/bin/bash
set -euo pipefail
pushd $(dirname "$0")/..
# make sure all components/systems are deployed
CORE_MODELS=("pixelaw-App" "pixelaw-AppName" "pixelaw-CoreActionsAddress" "pixelaw-Pixel" "pixelaw-Permissions" "pixelaw-QueueItem" "pixelaw-Instruction")
P_DASH_MODELS=("pixelaw-Block" "pixelaw-Stage")
echo "Write permissions for CORE_ACTIONS"
for model in ${CORE_MODELS[@]}; do
    sleep 0.1
    sozo --profile $SCARB_PROFILE auth grant writer model:$model,pixelaw-actions
done
echo "Write permissions for CORE_ACTIONS: Done"
echo "Initialize CORE_ACTIONS : pixelaw-actions"
sleep 0.1
sozo --profile $SCARB_PROFILE execute pixelaw-actions init
echo "Initialize CORE_ACTIONS: Done"
echo "Initialize P_DASH_ACTIONS: pixelaw-p_dash_actions"
sleep 0.1
sozo --profile $SCARB_PROFILE execute pixelaw-p_dash_actions init
echo "Initialize P_DASH_ACTIONS: Done"
echo "Write permissions for P_DASH_ACTIONS"
for model in ${P_DASH_MODELS[@]}; do
    sleep 0.1
    sozo --profile $SCARB_PROFILE auth grant writer model:$model,pixelaw-p_dash_actions
done
echo "Write permissions for P_DASH_ACTIONS: Done"