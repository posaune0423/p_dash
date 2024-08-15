import { WEBGL, Game } from 'phaser'
import { Game as MainGame } from '@/game/scenes/Game'
import { Preloader } from '@/game/scenes/Preloader'

//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config: Phaser.Types.Core.GameConfig = {
  type: WEBGL,
  parent: 'game-container',
  backgroundColor: '#0f172a',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { x: 0, y: 0 },
    },
  },
}

const StartGame = (
  parent: string,
  {
    stageData,
    width,
    height,
    stage,
  }: { stageData: Obstacle[]; width: number; height: number; stage: string },
) => {
  const game = new Game({ ...config, parent, width, height })
  game.scene.add('Preloader', Preloader, true, { stageData, stage })
  game.scene.add('MainGame', MainGame, false)
  return game
}

export { StartGame }
