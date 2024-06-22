#!/bin/bash
set -euo pipefail
pushd $(dirname "$0")/..

export RPC_URL="http://localhost:5050";

export WORLD_ADDRESS=$(cat ./manifests/dev/manifest.json | jq -r '.world.address')

# sozo execute --world <WORLD_ADDRESS> <CONTRACT> <ENTRYPOINT>
# sozo execute --world $WORLD_ADDRESS contracts::systems::actions::actions move -c 1 --wait
sozo execute --world $WORLD_ADDRESS 0x34610fcfff8343743812e347179888ab03cb5b0fe43395293c2e5276796cff0 interact -c 0x0,0x0