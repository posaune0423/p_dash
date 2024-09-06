'use client'

import { useEffect, useRef, useState } from 'react'
import RotateInstruction from './RotateInstruction'
import { BASIC_PIXEL } from '@/constants'
import { mockStageData } from '@/constants/mock'
import { type IRefPhaserGame, PhaserGame } from '@/game/PhaserGame'
import { useDojo } from '@/hooks/useDojo'
import { useOrientation } from '@/hooks/useOrientation'
import { getPixelComponentFromEntities, getPixelEntities } from '@/libs/dojo/helper'
import { type Obstacle } from '@/types'

// FIX: these number can be fetched from Stage model
const bounds = {
  'sci-fi': [
    [14, 19],
    [80, 28],
  ],
  desert: [
    [14, 19],
    [80, 28],
  ],
  jungle: [
    [14, 19],
    [80, 28],
  ],
}

// NOTE: JUST Wrapper component of PhaserGame cuz somehow dynamic import does not work with Ref
const Game = ({ stage }: { stage: string }) => {
  const { isLandscape } = useOrientation()
  const phaserRef = useRef<IRefPhaserGame | null>(null)
  const {
    setup: { toriiClient },
  } = useDojo()
  const [stageData, setStageData] = useState<Obstacle[]>([])

  useEffect(() => {
    const fetchStageData = async () => {
      const [[left, top], [right, bottom]] = bounds[stage]
      let obstacles: Obstacle[] = []

      if (stage === 'sci-fi') {
        obstacles = mockStageData[stage]
      } else {
        const pixelEntities = await getPixelEntities(toriiClient, 50000, {
          upperLeftX: left,
          upperLeftY: top,
          lowerRightX: right,
          lowerRightY: bottom,
        })
        const newPixels = getPixelComponentFromEntities(pixelEntities)

        // FIX: Fetch Stage model directly and detect Block type
        obstacles = newPixels.map((pixel) => {
          let block_type: string
          if (pixel.color === 4278190080) {
            // red
            block_type = 'spike'
          } else if (pixel.color === 16711680) {
            // green
            block_type = 'block'
          } else {
            block_type = 'null'
          }
          return {
            x: pixel.x * BASIC_PIXEL,
            y: -BASIC_PIXEL * (pixel.y - bottom),
            type: block_type,
          } as Obstacle
        })

        // prepare obstacles for game
        obstacles.sort((a, b) => a.x - b.x)
        obstacles.filter((obstacle) => obstacle.y > 0)
      }

      setStageData(obstacles)
    }

    fetchStageData()
  }, [stage, toriiClient])

  if (!isLandscape) {
    return <RotateInstruction />
  }

  return <PhaserGame ref={phaserRef} stageData={stageData} stage={stage} />
}

export default Game
