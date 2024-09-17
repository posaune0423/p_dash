'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useCallback, useMemo, useState } from 'react'
import CustomButton from './CustomButton'
import { Button } from '@/components/ui/button'
import { useDojo } from '@/hooks/useDojo'
import { type Block, BlockType } from '@/types'
import { cn } from '@/utils'

export const StageElements = ({
  stageId,
  currentBlocks,
  selectedElement,
  handleSelectElement,
}: {
  stageId?: number
  currentBlocks: Block[]
  selectedElement: BlockType | null
  handleSelectElement: (element: BlockType) => void
}) => {
  const {
    setup: {
      account: { account },
      connectedAccount,
      systemCalls: { initializeStage, batchPutBlocks },
    },
  } = useDojo()
  const activeAccount = useMemo(() => connectedAccount || account, [connectedAccount, account])
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleClickSave = useCallback(async () => {
    if (!activeAccount) return
    setIsLoading(true)
    if (stageId) {
      // TODO: update stage
      await batchPutBlocks(activeAccount, stageId, currentBlocks)
      setIsLoading(false)
      router.push(`/my/`)
    } else {
      const result = await initializeStage(activeAccount, 2, 2, 2, 2)
      console.log('result', result)
      await batchPutBlocks(activeAccount, 2, currentBlocks)
      router.push('/my/')
    }
    setIsLoading(false)
  }, [activeAccount, router, stageId, currentBlocks, initializeStage, batchPutBlocks])

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
              src='/assets/stage/sci-fi/tiles.png'
              width={36}
              height={36}
              alt='tiles'
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
          {isLoading ? 'Loading...' : 'Save'}
        </CustomButton>
      </div>
    </div>
  )
}
