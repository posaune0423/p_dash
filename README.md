# <img src="/client/public/logo.png" alt="p/dash">

[![ci-front](https://github.com/posaune0423/p_dash/actions/workflows/ci-front.yaml/badge.svg)](https://github.com/posaune0423/p_dash/actions/workflows/ci-front.yaml)
[![ci-contracts](https://github.com/posaune0423/p_dash/actions/workflows/ci-contracts.yaml/badge.svg)](https://github.com/posaune0423/p_dash/actions/workflows/ci-contracts.yaml)

## What is p/dash?
p/dash is a forced-scroll action game built on PixeLAW, inspired by [Geometry Dash](https://geometry-dash.fandom.com/wiki/Geometry_Dash_Wiki).

## Why we build?
We aim to build the first game that incorporates all three of the following elements:

- A digital physics system.
- New experiences such as composability and interoperability.
- An engaging and fun gameplay experience.

By integrating these elements, we aim to attract web2 gamers and create a situation where they must interact with blockchain technology to gain new experiences. When that time comes, the first blockchain they will encounter will be [Starknet](https://www.starknet.io/).

<img width="426" alt="Three Features" src="https://github.com/user-attachments/assets/3add6bec-b12e-4703-b291-82acc6a0778d" width="500px">



## How to play?
We can play a game.(WIP)

<img width="554" alt="Gameplay feat restructure" src="https://github.com/user-attachments/assets/35be362c-d6f0-48a6-ac8c-437f87bf4f26" width="500px">



## Getting Started

### Contracts

1. Check versions of Scarb, Cairo and Dojo

```zsh
$ sozo --version
sozo 1.0.0-alpha.13
scarb: 2.7.0
cairo: 2.7.0
sierra: 1.6.0

$ scarb --version         
scarb 2.7.0 (e9a2b8716 2024-08-01)
cairo: 2.7.0 (https://crates.io/crates/cairo-lang-compiler/2.7.0)
sierra: 1.6.0
```

2. Set up contracts.
Please check if the container is already up.
```zsh
$ cd contracts
$ sozo test
$ scarb run init
```

### Frontend to create a stage.
1. Change directory:
```zsh
$ cd client
```

2. Install
```zsh
$ bun i
```

3. Run the frontend for pixelaw side.
```zsh
$ bun dev
```

4. Make a Stage (WIP)
Please place objects to create  a stage.

<img width="1440" alt="Create a Stage" src="https://github.com/user-attachments/assets/1fad3915-ac05-4034-9648-a1ac6097dea5">

### Frotend to play a game.
1. Install dependencies.
```zsh
$ bun i
```

2. Run the frontend to play.
```zsh
$ bun dev
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
Our project is a lightweight WebGL game built with React and Phaser, aiming to enhance UX by delivering it to users as a PWA. The on-chain components are built with Starknet and the Dojo Framework, and this project functions as an application on the PixeLAW Protocol.

## Tech stacks
- [Next.js](https://nextjs.org/): to build a p/dash client
- [Phaser](https://phaser.io/): to build a game client.
- [React](https://react.dev/)/[Vite](https://vitejs.dev/): to build a PixeLAW frontend.
- [PWA](https://en.wikipedia.org/wiki/Progressive_web_app): to provide proggressive application.
- [Dojo Framework](https://book.dojoengine.org/): to write contracts in ECS.
  - [slot](https://book.dojoengine.org/toolchain/slot): to deploy.
- [PixeLAW](https://www.pixelaw.xyz/): to get a degital physics, composability and interoperability.

## Future plans
This project holds great potential, and we plan to continue building it even after the hackathon. Our future expansions include the following ideas:

- Enhancing the gaming experience: We aim to provide a gaming experience equal to or better than existing web2 games. To achieve this, we will first focus on improving the UI/UX.
- Hosting stage co-creation events: We plan to organize events where participants can collaboratively create a stage on PixeLAW over a set period.
- Exploring composability: We aim to allow users to automatically add new objects and create betting functions on top.
- Exploring interoperability: PixeLAW will enable interaction with stages created by other applications and players, leading to new experiences.
- Exploring different games: It is also possible to create objects like stages on PixeLAW and explore the potential of off-chain gameplay. For example, action games similar to Mario could be considered.
