# Dojo Phaser Template

## Getting Started

### Contracts

1. Check versions of Scarb and Dojo and Cairo

```zsh
sozo --version
sozo 0.7.0-alpha.5
scarb: 2.6.3
cairo: 2.6.3
sierra: 1.5.0

scarb --version
scarb 2.6.3 (e6f921dfd 2024-03-13)
cairo: 2.6.3 (https://crates.io/crates/cairo-lang-compiler/2.6.3)
sierra: 1.5.0
```

2. Run Katana on http://0.0.0.0:5050

```zsh
katana --disable-fee --allowed-origins "*"
```

3. Apply migrations

```zsh
scarb run migrate
```

4. Run indexer on http://0.0.0.0:8080

```zsh
torii --world 0x009f1c624eea5ad97ea4bee805b2c46d4db96c8bee88a061a1905e67e5683cc1 --allowed-origins "*"
```

5. Run spawn

```zsh
scarb run spawn
```

6. Run move

```zsh
scarb run move
```

### Frontend

1. Install dependencies

```zsh
pnpm install
```

2. Run the frontend

```zsh
pnpm run dev
```

## Trouble Shooting

- When I change dir name dojo-starter to contracts
  - I should've rename `dojo-starter` to `contracts` in source files
  - Then remove `contracts/manifests` and `sozo migrate plan` to re-generate them
  - Then in the `client` dir, run `pn components` to re-generate clientComponents
- When using alpha verison of Dojo, Language Server may not work correctly
  - Downgrade to beta version of Dojo
