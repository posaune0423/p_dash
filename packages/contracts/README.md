# p_dash Contracts

## How to run in Locally

1. Start pixelaw server
`Cmd + Shift + P` and select `Dev Container: Reopen in Container`

2. Migrate your contracts with sozo
```zsh
sozo migrate apply
```

## To deploy using slot

1. Create a new katana sequencer with slot

```zsh
slot deployments create p-dash-dev katana --version v1.0.0-alpha.9
```

2. Migrate contracts

```zsh
sozo --profile slot build

sozo --profile slot migrate plan
sozo --profile slot migrate apply
```

3. Create a new torii indexer with slot

```zsh
slot deployments create p-dash-dev torii --world YOUR_WORLD_ADDRESS --rpc YOUR_NEW_RPC_URL --version v1.0.0-alpha.9
```
