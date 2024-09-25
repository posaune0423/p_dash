'use client'

import { useComponentValue, useEntityQuery } from '@dojoengine/react'
import { getComponentValue, HasValue } from '@dojoengine/recs'
import { getEntityIdFromKeys } from '@dojoengine/utils'
import { useMemo, useRef } from 'react'
import RotateInstruction from './RotateInstruction'
import { BASIC_PIXEL } from '@/constants'
import { mockStageData } from '@/constants/mock'
import { type IRefPhaserGame, PhaserGame } from '@/game/PhaserGame'
import { useDojo } from '@/hooks/useDojo'
import { useOrientation } from '@/hooks/useOrientation'
import { BlockType, type Obstacle } from '@/types'
import { GRID_HEIGHT } from '@/utils/stageHelper'

const isDefaultStage = (stageId: string) => {
  return stageId === 'sci-fi' || stageId === 'desert' || stageId === 'jungle'
}

// NOTE: JUST Wrapper component of PhaserGame cuz somehow dynamic import does not work with Ref
const Game = ({ stageId }: { stageId: string }) => {
  const { isLandscape } = useOrientation()
  const phaserRef = useRef<IRefPhaserGame | null>(null)
  const {
    setup: {
      clientComponents: { Block, Stage },
    },
  } = useDojo()

  const stage = useComponentValue(
    Stage,
    getEntityIdFromKeys([isDefaultStage(stageId) ? 0n : BigInt(stageId)]),
  )
  const blockEntities = useEntityQuery([
    HasValue(Block, { stage_id: isDefaultStage(stageId) ? 0n : BigInt(stageId) }),
  ])
  const blocks = blockEntities.map((entity) => getComponentValue(Block, entity))

  const stageData = useMemo(() => {
    if (isDefaultStage(stageId)) {
      return mockStageData[stageId]
    }

    if (!stage) return []

    return blocks.reduce<Obstacle[]>((acc, block) => {
      if (
        block &&
        (block.blocktype as unknown as BlockType) !== BlockType.Empty &&
        (block.blocktype as unknown as BlockType) !== BlockType.InitBlock
      ) {
        const obstacle: Obstacle = {
          x: (Number(block.x) - Number(stage.x)) * BASIC_PIXEL,
          y: (GRID_HEIGHT - (Number(block.y) - Number(stage.y)) - 1) * BASIC_PIXEL,
          type: block.blocktype as unknown as BlockType,
        }

        // Insert the obstacle in the correct position to maintain sorting
        const insertIndex = acc.findIndex((item) => item.x > obstacle.x)
        if (insertIndex === -1) {
          acc.push(obstacle)
        } else {
          acc.splice(insertIndex, 0, obstacle)
        }
      }
      return acc
    }, [])
  }, [blocks, stage, stageId])

  if (!isLandscape) {
    return <RotateInstruction />
  }

  return (
    <PhaserGame
      ref={phaserRef}
      stageData={stageData}
      stageId={isDefaultStage(stageId) ? stageId : 'sci-fi'}
    />
  )
}

export default Game
