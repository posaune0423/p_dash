// import { useComponentValue, useEntityQuery } from '@dojoengine/react'
// import { getComponentValue, HasValue } from '@dojoengine/recs'
// import { getEntityIdFromKeys } from '@dojoengine/utils'
import { useMemo, useRef } from 'react'
import RotateInstruction from '@/components/RotateInstruction'
// import { BASIC_PIXEL } from '@/constants'
import { mockStageData } from '@/constants/mock'
import { useOrientation } from '@/hooks/useOrientation'
// import { type BlockType } from '@/libs/dojo/typescript/models.gen'
import { type IRefPhaserGameRender, PhaserGameRender } from '@/libs/phaser/PhaserGameRender'
import { useParams } from 'react-router-dom'
// import { type Obstacle } from '@/types'
// import { GRID_HEIGHT } from '@/utils/stageHelper'

const isDefaultStage = (stageId: string) => {
  return stageId === 'easy' || stageId === 'medium' || stageId === 'hard'
}

// NOTE: JUST Wrapper component of PhaserGame cuz somehow dynamic import does not work with Ref
const GameDetailPage = () => {
  const { stageId } = useParams()
  console.log(stageId)
  const { isLandscape } = useOrientation()
  const phaserRef = useRef<IRefPhaserGameRender | null>(null)

  //   const stage = useComponentValue(Stage, getEntityIdFromKeys([isDefaultStage(stageId) ? 0n : BigInt(stageId)]))
  //   const blockEntities = useEntityQuery([HasValue(Block, { stage_id: isDefaultStage(stageId) ? 0n : BigInt(stageId) })])
  //   const blocks = blockEntities.map((entity) => getComponentValue(Block, entity))

  const stageData = useMemo(() => {
    if (isDefaultStage(stageId!)) {
      return mockStageData[stageId]
    }

    return []

    // if (!stage) return []

    // return blocks.reduce<Obstacle[]>((acc, block) => {
    //   if (block && block.blocktype !== 'Empty' && block.blocktype !== 'InitBlock') {
    //     const obstacle: Obstacle = {
    //       x: (Number(block.x) - Number(stage.x)) * BASIC_PIXEL,
    //       y: (GRID_HEIGHT - (Number(block.y) - Number(stage.y)) - 1) * BASIC_PIXEL,
    //       type: block.blocktype as unknown as BlockType,
    //     }

    //     // Insert the obstacle in the correct position to maintain sorting
    //     const insertIndex = acc.findIndex((item) => item.x > obstacle.x)
    //     if (insertIndex === -1) {
    //       acc.push(obstacle)
    //     } else {
    //       acc.splice(insertIndex, 0, obstacle)
    //     }
    //   }
    //   return acc
    // }, [])
  }, [stageId])

  console.log(stageData)

  if (stageData.length === 0)
    return <div className="flex h-screen items-center justify-center bg-gray-800 text-xl text-white">Loading...</div>

  if (!isLandscape) {
    return <RotateInstruction />
  }

  return <PhaserGameRender ref={phaserRef} stageData={stageData} stageId={isDefaultStage(stageId!) ? stageId! : 'easy'} />
}

export default GameDetailPage
