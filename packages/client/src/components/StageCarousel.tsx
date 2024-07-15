'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useCallback, useEffect, useState, useTransition } from 'react'
import { Carousel, type CarouselApi, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { cn } from '@/utils'

const stageList = [
  {
    id: 'sci-fi',
    name: 'Sci-Fi',
    thumbnail: '/assets/stage/sci-fi/bg.png',
    enabled: true,
  },
  {
    id: 'desert',
    name: 'Desert',
    thumbnail: '/assets/stage/desert/bg.png',
    enabled: true,
  },
  {
    id: 'jungle',
    name: 'Jungle',
    thumbnail: '/assets/stage/jungle/bg.png',
    enabled: true,
  },
  {
    id: 'ocean',
    name: 'Ocean',
    thumbnail: '/assets/stage/ocean/bg.png',
    enabled: false,
  },
]

const StageCard = ({
  id,
  name,
  thumbnail,
  active,
  enabled,
}: {
  id: string
  name: string
  thumbnail: string
  active: boolean
  enabled: boolean
}) => {
  return (
    <div
      className={cn('w-fit rounded-lg relative', enabled ? 'cursor-pointer' : 'cursor-not-allowed')}
    >
      <Link href={enabled ? `/game/${id}` : '#'} onClick={(e) => !enabled && e.preventDefault()}>
        <div className={cn('relative', !enabled && 'opacity-50')}>
          <Image
            src={thumbnail}
            alt={name}
            objectFit='cover'
            height={400}
            width={400}
            className={cn(
              'mx-auto rounded-lg',
              active ? 'h-[160px] w-[320px]' : 'h-[140px] w-[300px]',
            )}
          />
          {!enabled && (
            <div className='absolute inset-0 flex items-center justify-center'>
              <span className='rounded bg-black/50 px-4 py-2 text-xl font-bold text-white'>
                Coming Soon
              </span>
            </div>
          )}
        </div>
      </Link>
    </div>
  )
}

const StageCarousel = () => {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [, startTransition] = useTransition()
  const updateCurrent = useCallback((index: number) => {
    const TRANSITION_DURATION = 410
    setTimeout(() => {
      startTransition(() => {
        setCurrent(index)
      })
    }, TRANSITION_DURATION)
  }, [])

  useEffect(() => {
    if (!api) {
      return
    }

    api.on('select', () => {
      updateCurrent(api.selectedScrollSnap())
    })
  }, [api, updateCurrent])

  return (
    <Carousel
      setApi={setApi}
      opts={{
        align: 'center',
        loop: true,
      }}
      className='mx-auto w-full max-w-xl'
    >
      <CarouselContent className='items-center'>
        {stageList.map((stage, index) => (
          <CarouselItem
            key={index}
            className={cn(
              'min-w-fit ml-8 basis-1/3 rounded-lg pl-0',
              current === index ? 'border-2 border-white' : '',
            )}
          >
            <StageCard
              enabled={stage.enabled}
              name={stage.name}
              thumbnail={stage.thumbnail}
              id={stage.id}
              active={current === index}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}

export default StageCarousel
