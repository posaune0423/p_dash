#!/bin/bash
set -euo pipefail

# Get the profile from $SCARB_PROFILE
profile=${SCARB_PROFILE:-"dev"}

# Read values from dojo_${profile}.toml
config_file="dojo_${profile}.toml"

if [ ! -f "$config_file" ]; then
	echo "Error: $config_file not found"
	exit 1
fi

# Extract values using grep and cut
account_address=$(grep "account_address" "$config_file" | cut -d'"' -f2)
private_key=$(grep "private_key" "$config_file" | cut -d'"' -f2)
world_address=$(grep "world_address" "$config_file" | cut -d'"' -f2)


# Initialize Stage
sozo execute --profile $SCARB_PROFILE pixelaw-p_dash_actions initialize_stage --calldata 0,0,0,0,"0xFFFFFF"
