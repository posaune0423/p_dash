# p_dash_dev Contracts

## How to run in Locally

Please run .devcotainer.

```zsh
scarb run initialize
```

## To deploy using slot

1. Create a new katana sequencer with slot

```zsh
slot deployments create p-dash-dev katana --version 0.7.0.alpha.2
```

2. Migrate contracts

```zsh
sozo --profile stg build

sozo --profile stg migrate plan
sozo --profile stg migrate apply
```

3. Create a new torii indexer with slot

```zsh
slot deployments create p-dash-dev torii --world YOUR_WORLD_ADDRESS --rpc YOUR_NEW_RPC_URL --version 0.7.0.alpha.2
```
