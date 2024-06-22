#!/bin/bash
set -euo pipefail
# shellcheck disable=SC2046
pushd $(dirname "$0")/..

# build contracts
sozo build

# deploy contracts
sozo migrate plan
sozo migrate apply

# grant writer to p_dash Models
sozo auth grant writer Block,0x2c70692e71ea0ec5e9be0ca4542bb2680f49b863dc24b039143592824f069c
sozo auth grant writer Stage,0x6e3fde9035218192ded3012cb7b1a36bf4d4a94c2073e158f754ffa6c43ec65
sozo auth grant writer StageId,0x3d62d09875c450a6a3356f7338ab00b2cb7c9e74410c7c2f24ee05827b45bb4

# initialize p_dash_actions
sozo execute 0x34610fcfff8343743812e347179888ab03cb5b0fe43395293c2e5276796cff0 init

echo "Default authorizations have been successfully set."