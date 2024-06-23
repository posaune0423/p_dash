# p/dash

## What is p/dash?
p/dash is a forced-scroll action game built on PixeLAW, inspired by [Geometry Dash](https://geometry-dash.fandom.com/wiki/Geometry_Dash_Wiki).

## Why we build?
We aim to build the first game that incorporates all three of the following elements:

- A digital physics system.
- New experiences such as composability and interoperability.
- An engaging and fun gameplay experience.
By integrating these elements, we aim to attract web2 gamers and create a situation where they must interact with blockchain technology to gain new experiences. When that time comes, the first blockchain they will encounter will be [Starknet](https://www.starknet.io/).
![image](./assets/three_features.png)

## How to play?
WIP

## Getting Started

### Contracts

1. Check versions of Scarb and Dojo and Cairo

```zsh
$ sozo --version                                                                               
sozo 0.7.0-alpha.2
scarb: 2.6.4
cairo: 2.6.3
sierra: 1.5.0

$ scarb --version       
scarb 2.6.4 (c4c7c0bac 2024-03-19)
cairo: 2.6.3 (https://crates.io/crates/cairo-lang-compiler/2.6.3)
sierra: 1.5.0
```

2. Run .devcontainer
Open this project with vscode, and run [.devcontainer](https://code.visualstudio.com/docs/devcontainers/containers).

3. Set up contracts.
Please check if the container is already up.
```zsh
$ cd ./packages/contracts
$ sozo test
$ scarb run initialize
```

### Frontend to create a stage.
1. Change directory:
```zsh
$ cd <path-to-packages>/pixelaw_client
```

2. Install
```zsh
$ pnpm i
```

3. Run the frontend for pixelaw side.
```zsh
$ pnpm run dev --port 9000
```

4. Make a Stage (WIP)
Please place objects to create  a stage.
![image](./assets/create_a_stage.png)

<!-- 5. Export a Json file (WIP)
 -->

### Frotend to play a game.
1. Install dependencies.
```zsh
$ pnpm i
```

2. Run the frontend to play.
```zsh
$ pnpm run dev
```

### Trouble Shooting
- Strongly recommend to use chrome's incognito mode.
- When I change dir name dojo-starter to contracts
  - I should've rename `dojo-starter` to `contracts` in source files
  - Then remove `contracts/manifests` and `sozo migrate plan` to re-generate them
  - Then in the `client` dir, run `pn components` to re-generate clientComponents
- When using alpha verison of Dojo, Language Server may not work correctly
  - Downgrade to beta version of Dojo

## How we buid?
To bring digital physics to our game, we are building our game on PixeLAW. You can create stages on PixeLAW and play those stages dynamically by loading them. The gameplay itself is built off-chain, so there are no constraints on the gaming experience. Theoretically, we can provide a game of the same quality as existing web2 games.

## Tech stacks.
- [React](https://react.dev/)/[Vite](https://vitejs.dev/)
- [Phaser](https://phaser.io/)
- [PWA](https://en.wikipedia.org/wiki/Progressive_web_app)
- [Dojo Framework](https://book.dojoengine.org/)
- [PixeLAW](https://www.pixelaw.xyz/)