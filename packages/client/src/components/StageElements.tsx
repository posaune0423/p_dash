'use client'

import Image from 'next/image'
import Link from 'next/link'
import CustomButton from './CustomButton'
import { Button } from '@/components/ui/button'
import { cn } from '@/utils'

export const StageElements = ({
  selectedElement,
  handleSelectElement,
}: {
  selectedElement: string | null
  handleSelectElement: (element: string) => void
}) => {
  return (
    <div className='fixed bottom-0 left-0 h-[50px] w-full bg-black/80'>
      <div className='mx-auto flex max-w-lg items-center justify-between gap-2 p-1'>
        <Button>
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
        <CustomButton>Save</CustomButton>
      </div>
    </div>
  )
}
