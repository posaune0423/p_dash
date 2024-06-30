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
  backgroundColor: '#0f172a',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { x: 0, y: 0 },
    },
  },
}

const StartGame = (parent: string, { stageData }: { stageData: Obstacle[] }) => {
  console.log('=== StartGame ===')
  console.log('innerWidth: ', window.innerWidth, 'innerHeight: ', window.innerHeight)
  console.log('screenWidth: ', screen.width, 'screenHeight: ', screen.height)
  console.log('clientWidth: ', document.documentElement.clientWidth, 'clientHeight: ', document.documentElement.clientHeight)
  const game = new Game({ ...config, parent })
  game.scene.add('Preloader', Preloader, true, { stageData })
  game.scene.add('MainGame', MainGame, false)
  return game
}

export { StartGame }
