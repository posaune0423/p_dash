'use client'

import { useEntityQuery, useQuerySync } from '@dojoengine/react'
import { getComponentValue, Has } from '@dojoengine/recs'
import { Loader2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useCallback, useMemo, useState } from 'react'
import CustomButton from './CustomButton'
import { Button } from '@/components/ui/button'
import { useDojo } from '@/hooks/useDojo'
import { BlockType } from '@/libs/dojo/typescript/models.gen'
import { type Block } from '@/types'
import { cn } from '@/utils'
import { APP_OFFSET, GRID_HEIGHT, GRID_WIDTH } from '@/utils/stageHelper'

export const StageElements = ({
  stageId,
  currentBlocks,
  selectedElement,
  handleSelectElement,
}: {
  stageId?: string
  currentBlocks: Block[]
  selectedElement: BlockType | null
  handleSelectElement: (element: BlockType) => void
}) => {
  const {
    setup: {
      account: { account },
      connectedAccount,
      toriiClient,
      systemCalls: { initializeStage, batchPutBlocks },
      contractComponents,
      clientComponents: { Stage },
    },
  } = useDojo()
  const activeAccount = useMemo(() => connectedAccount || account, [connectedAccount, account])
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useQuerySync(toriiClient, [contractComponents.Stage], [])

  const stageEntities = useEntityQuery([Has(Stage)])
  const stagesList = useMemo(
    () => stageEntities.map((entity) => getComponentValue(Stage, entity)),
    [stageEntities, Stage],
  )
  const newStagePosition = useMemo(() => {
    // Find the stage with the maximum x and y coordinates
    const maxStage = stagesList.reduce<{ x: number; y: number; w: number; h: number }>(
      (max, stage) => {
        if (!stage) return max
        if (stage.x > max.x || (stage.x === max.x && stage.y > max.y)) {
          return { x: stage.x, y: stage.y, w: stage.w, h: stage.h }
        }
        return max
      },
      { x: 0, y: 0, w: 0, h: 0 },
    )

    // Calculate the position for the new stage
    return {
      x: maxStage.x === 0 ? APP_OFFSET.x : maxStage.x + maxStage.w + 1, // Add 1 for spacing
      y: maxStage.y === 0 ? APP_OFFSET.y : maxStage.y, // Add 1 for spacing
    }
  }, [stagesList])

  const handleClickSave = useCallback(async () => {
    if (!activeAccount) return
    setIsLoading(true)
    if (stageId) {
      // update stage
      const stage = stagesList.find((stage) => stage?.id === BigInt(stageId ?? 0))
      const transformedBlocks = currentBlocks.map((block) => ({
        ...block,
        x: block.x + Number(stage?.x),
        y: block.y + Number(stage?.y),
      }))
      await batchPutBlocks(activeAccount, stageId, transformedBlocks)
      setIsLoading(false)
      router.push(`/my/`)
    } else {
      // create stage
      const stageId = await initializeStage(
        activeAccount,
        newStagePosition.x,
        newStagePosition.y,
        GRID_WIDTH,
        GRID_HEIGHT,
      )

      await batchPutBlocks(activeAccount, stageId, currentBlocks)
      router.push('/my/')
    }
    setIsLoading(false)
  }, [
    activeAccount,
    router,
    stagesList,
    newStagePosition,
    stageId,
    currentBlocks,
    initializeStage,
    batchPutBlocks,
  ])

  return (
    <div className='fixed bottom-0 left-0 h-[50px] w-full bg-black/80'>
      <div className='mx-auto flex max-w-lg items-center justify-between gap-2 p-1'>
        <Button disabled={isLoading}>
          <Link href='/my'>Back</Link>
        </Button>
        <div className='flex items-center gap-8'>
          <div
            className={cn(
              'relative w-9 h-9 cursor-pointer',
              selectedElement === BlockType.Block &&
                'before:absolute before:inset-0 before:border-2 before:border-white/80 before:rounded-md',
            )}
            onClick={() => handleSelectElement(BlockType.Block)}
          >
            <Image
              src='/assets/stage/sci-fi/block.png'
              width={36}
              height={36}
              alt='block'
              className={cn(
                selectedElement === BlockType.Block && 'border-2 border-white/80 rounded-md',
              )}
              onClick={() => handleSelectElement(BlockType.Block)}
            />
          </div>
          <div
            className={cn(
              'relative w-9 h-9 cursor-pointer',
              selectedElement === BlockType.Tile &&
                'before:absolute before:inset-0 before:border-2 before:border-white/80 before:rounded-md',
            )}
            onClick={() => handleSelectElement(BlockType.Tile)}
          >
            <Image
              src='/assets/stage/sci-fi/tile.png'
              width={36}
              height={36}
              alt='tile'
              className={cn(
                selectedElement === BlockType.Tile && 'border-2 border-white/80 rounded-md',
              )}
              onClick={() => handleSelectElement(BlockType.Tile)}
            />
          </div>
          <div
            className={cn(
              'relative w-9 h-9 cursor-pointer',
              selectedElement === BlockType.Spike &&
                'before:absolute before:inset-0 before:border-2 before:border-white/80 before:rounded-md',
            )}
            onClick={() => handleSelectElement(BlockType.Spike)}
          >
            <Image
              src='/assets/stage/sci-fi/spike.png'
              width={36}
              height={36}
              alt='spike'
              className='size-full object-contain'
            />
          </div>
        </div>
        <CustomButton onClick={handleClickSave} disabled={isLoading}>
          {isLoading ? (
            <p className='flex items-center gap-2'>
              Loading...
              <Loader2 className='animate-spin' />
            </p>
          ) : (
            'Save'
          )}
        </CustomButton>
      </div>
    </div>
  )
}
