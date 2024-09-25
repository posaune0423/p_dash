import { BASIC_PIXEL, GOAL_BUFFER } from '@/constants'
import { BlockType, type Obstacle } from '@/types'

function generateTiles(maxX: number): Obstacle[] {
  const tiles: Obstacle[] = []
  for (let x = 0; x <= maxX + GOAL_BUFFER; x += BASIC_PIXEL) {
    tiles.push({ x, y: 0, type: BlockType.Tile })
  }
  return tiles
}

function addTilesToStage(stage: Obstacle[]): Obstacle[] {
  const maxX = Math.max(...stage.map((obstacle) => obstacle.x))
  const tiles = generateTiles(maxX)
  return [...tiles, ...stage]
}

export const mockStageData: { [key: string]: Obstacle[] } = {
  'sci-fi': addTilesToStage([
    { x: 600, y: 50, type: BlockType.Block },
    { x: 920, y: 50, type: BlockType.Spike },
    { x: 980, y: 50, type: BlockType.Block },
    { x: 1460, y: 50, type: BlockType.Spike },
    { x: 1790, y: 50, type: BlockType.Spike },
    { x: 1840, y: 50, type: BlockType.Block },
    { x: 2140, y: 80, type: BlockType.Block },
    { x: 2190, y: 50, type: BlockType.Spike },
    { x: 2580, y: 50, type: BlockType.Block },
    { x: 2910, y: 100, type: BlockType.Block },
    { x: 2960, y: 50, type: BlockType.Spike },
    { x: 3100, y: 50, type: BlockType.Spike },
    { x: 3100, y: 150, type: BlockType.Block },
    { x: 3480, y: 50, type: BlockType.Block },
    { x: 3620, y: 50, type: BlockType.Spike },
    { x: 3670, y: 50, type: BlockType.Spike },
    { x: 4140, y: 50, type: BlockType.Block },
    { x: 4260, y: 50, type: BlockType.Spike },
    { x: 4660, y: 50, type: BlockType.Block },
    { x: 4780, y: 50, type: BlockType.Spike },
    { x: 4920, y: 50, type: BlockType.Block },
    { x: 5040, y: 50, type: BlockType.Spike },
  ]).sort((a, b) => a.x - b.x),

  desert: addTilesToStage([
    { x: 500, y: 50, type: BlockType.Spike },
    { x: 800, y: 100, type: BlockType.Block },
    { x: 1000, y: 200, type: BlockType.Block },
    { x: 1200, y: 50, type: BlockType.Block },
    { x: 1500, y: 50, type: BlockType.Block },
    { x: 1800, y: 50, type: BlockType.Block },
  ]).sort((a, b) => a.x - b.x),

  jungle: addTilesToStage([
    { x: 100, y: 300, type: BlockType.Block },
    { x: 200, y: 300, type: BlockType.Block },
    { x: 280, y: 300, type: BlockType.Block },
    { x: 200, y: 370, type: BlockType.Block },
    { x: 280, y: 370, type: BlockType.Block },
    { x: 400, y: 100, type: BlockType.Block },
    { x: 400, y: 170, type: BlockType.Block },
    { x: 400, y: 240, type: BlockType.Block },
    { x: 400, y: 310, type: BlockType.Block },
    { x: 520, y: 300, type: BlockType.Block },
    { x: 520, y: 370, type: BlockType.Block },
    { x: 640, y: 100, type: BlockType.Block },
    { x: 640, y: 170, type: BlockType.Block },
    { x: 640, y: 240, type: BlockType.Block },
    { x: 640, y: 310, type: BlockType.Block },
    { x: 800, y: 300, type: BlockType.Block },
    { x: 800, y: 370, type: BlockType.Block },
    { x: 1000, y: 170, type: BlockType.Block },
    { x: 1080, y: 240, type: BlockType.Block },
    { x: 1160, y: 310, type: BlockType.Block },
    { x: 1240, y: 300, type: BlockType.Block },
    { x: 1320, y: 370, type: BlockType.Block },
    { x: 1400, y: 100, type: BlockType.Block },
    { x: 1480, y: 170, type: BlockType.Block },
    { x: 1560, y: 240, type: BlockType.Block },
    { x: 1640, y: 310, type: BlockType.Block },
    { x: 1720, y: 300, type: BlockType.Block },
    { x: 1960, y: 170, type: BlockType.Block },
    { x: 2040, y: 240, type: BlockType.Block },
    { x: 2120, y: 310, type: BlockType.Block },
    { x: 2200, y: 300, type: BlockType.Block },
    { x: 2280, y: 370, type: BlockType.Block },
    { x: 2440, y: 170, type: BlockType.Block },
    { x: 2520, y: 240, type: BlockType.Block },
    { x: 2600, y: 310, type: BlockType.Block },
    { x: 2680, y: 300, type: BlockType.Block },
    { x: 2920, y: 170, type: BlockType.Block },
    { x: 3000, y: 240, type: BlockType.Block },
    { x: 3080, y: 310, type: BlockType.Block },
    { x: 3160, y: 300, type: BlockType.Block },
    { x: 3400, y: 170, type: BlockType.Block },
    { x: 3480, y: 240, type: BlockType.Block },
    { x: 3560, y: 310, type: BlockType.Block },
    { x: 3640, y: 300, type: BlockType.Block },
    { x: 3880, y: 170, type: BlockType.Block },
    { x: 3880, y: 100, type: BlockType.Block },
    { x: 3960, y: 240, type: BlockType.Block },
    { x: 4120, y: 300, type: BlockType.Block },
    { x: 4200, y: 370, type: BlockType.Block },
    { x: 4360, y: 170, type: BlockType.Block },
    { x: 4360, y: 100, type: BlockType.Block },
    { x: 4440, y: 240, type: BlockType.Block },
    { x: 4520, y: 310, type: BlockType.Block },
    { x: 4600, y: 300, type: BlockType.Block },
    { x: 4840, y: 170, type: BlockType.Block },
    { x: 4920, y: 240, type: BlockType.Block },
  ]).sort((a, b) => a.x - b.x),
}
