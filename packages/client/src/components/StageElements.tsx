'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useCallback, useMemo, useState } from 'react'
import CustomButton from './CustomButton'
import { Button } from '@/components/ui/button'
import { useDojo } from '@/hooks/useDojo'
import { cn } from '@/utils'

export const StageElements = ({
  selectedElement,
  handleSelectElement,
}: {
  selectedElement: string | null
  handleSelectElement: (element: string) => void
}) => {
  const {
    setup: {
      account: { account },
      connectedAccount,
      systemCalls: { initializeStage },
    },
  } = useDojo()
  const activeAccount = useMemo(() => connectedAccount || account, [connectedAccount, account])
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleClickSave = useCallback(async () => {
    if (!activeAccount) return
    setIsLoading(true)
    initializeStage(activeAccount, { x: 2, y: 2, color: 0x0 })
      .then(() => {
        router.push('/my')
      })
      .catch((error) => {
        console.error(error)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [activeAccount, initializeStage, router])

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
              selectedElement === 'block' &&
                'before:absolute before:inset-0 before:border-2 before:border-white/80 before:rounded-md',
            )}
            onClick={() => handleSelectElement('block')}
          >
            <Image
              src='/assets/stage/sci-fi/block.png'
              width={36}
              height={36}
              alt='block'
              className={cn(selectedElement === 'block' && 'border-2 border-white/80 rounded-md')}
              onClick={() => handleSelectElement('block')}
            />
          </div>
          <div
            className={cn(
              'relative w-9 h-9 cursor-pointer',
              selectedElement === 'tiles' &&
                'before:absolute before:inset-0 before:border-2 before:border-white/80 before:rounded-md',
            )}
            onClick={() => handleSelectElement('tiles')}
          >
            <Image
              src='/assets/stage/sci-fi/tiles.png'
              width={36}
              height={36}
              alt='tiles'
              className={cn(selectedElement === 'tiles' && 'border-2 border-white/80 rounded-md')}
              onClick={() => handleSelectElement('tiles')}
            />
          </div>
          <div
            className={cn(
              'relative w-9 h-9 cursor-pointer',
              selectedElement === 'spike' &&
                'before:absolute before:inset-0 before:border-2 before:border-white/80 before:rounded-md',
            )}
            onClick={() => handleSelectElement('spike')}
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
