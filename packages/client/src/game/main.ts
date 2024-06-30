import { AUTO, Game } from 'phaser'
import { Game as MainGame } from '@/game/scenes/Game'
import { Preloader } from '@/game/scenes/Preloader'

//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config: Phaser.Types.Core.GameConfig = {
  type: AUTO,
  width: screen.width > screen.height ? screen.width : screen.height,
  height: screen.width > screen.height ? screen.height : screen.width,
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
  const game = new Game({ ...config, parent })
  game.scene.add('Preloader', Preloader, true, { stageData })
  game.scene.add('MainGame', MainGame, false)
  return game
}

export { StartGame }
