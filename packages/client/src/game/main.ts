import { AUTO, Game } from 'phaser'
import { Game as MainGame } from '@/game/scenes/Game'
import { Preloader } from '@/game/scenes/Preloader'

//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config: Phaser.Types.Core.GameConfig = {
  type: AUTO,
  width: window.innerWidth > window.innerHeight ? window.innerWidth : window.innerHeight,
  height: window.innerWidth > window.innerHeight ? window.innerHeight : window.innerWidth,
  parent: 'game-container',
  backgroundColor: '#000000',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { x: 0, y: 0 },
    },
  },
  scene: [Preloader, MainGame],
}

const StartGame = (parent: string) => {
  return new Game({ ...config, parent })
}

export { StartGame }
