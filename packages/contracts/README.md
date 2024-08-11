# p_dash_dev Contracts

## How to run in Locally

1. Start katana server
```zsh
katana --disable-fee  --allowed-origins "*"
```zsh
```

2. Migrate your contracts with sozo
```zsh
sozo migrate apply
```

3. Create a new torii indexer
```zsh
torii --world 0x3b31a7f08bb1b2028b195f634cac796bbe8bbbf81e7ac287456f394ff867897 --allowed-origins "*"
```

## To deploy using slot

1. Create a new katana sequencer with slot

```zsh
slot deployments create p-dash-dev katana --version v1.0.0-alpha.4
```

2. Migrate contracts

```zsh
sozo --profile slot build

sozo --profile slot migrate plan
sozo --profile slot migrate apply
```

3. Create a new torii indexer with slot

```zsh
slot deployments create p-dash-dev torii --world YOUR_WORLD_ADDRESS --rpc YOUR_NEW_RPC_URL --version v1.0.0-alpha.4
```
