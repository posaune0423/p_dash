import { WEBGL, Game } from 'phaser'
import { Main } from '@/phaser/scenes/Main'
import { Preloader } from '@/phaser/scenes/Preloader'
import { type Obstacle } from '@/types'

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
    stageId,
  }: { stageData: Obstacle[]; width: number; height: number; stageId: string },
) => {
  const game = new Game({ ...config, parent, width, height })
  game.scene.add('Preloader', Preloader, true, { stageData, stageId })
  game.scene.add('Main', Main, false, { stageId })
  return game
}

export { StartGame }
