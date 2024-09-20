'use client'

import { useEntityQuery } from '@dojoengine/react'
import { getComponentValue, Has } from '@dojoengine/recs'
import Image from 'next/image'
import Link from 'next/link'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useSound } from 'use-sound'
import { Button } from './ui/button'
import { Carousel, type CarouselApi, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { useDojo } from '@/hooks/useDojo'
import { cn, truncateAddress } from '@/utils'

const defaultStages = [
  {
    id: 'sci-fi',
    name: 'Sci-Fi',
    thumbnail: '/assets/stage/sci-fi/bg.png',
    creator: '0x1234567890123456789012345678901234567890',
    enabled: true,
  },
  {
    id: 'desert',
    name: 'Desert',
    thumbnail: '/assets/stage/desert/bg.png',
    creator: '0x1234567890123456789012345678901234567890',
    enabled: true,
  },
  {
    id: 'jungle',
    name: 'Jungle',
    thumbnail: '/assets/stage/jungle/bg.png',
    creator: '0x1234567890123456789012345678901234567890',
    enabled: true,
  },
  {
    id: 'ocean',
    name: 'Ocean',
    thumbnail: '/assets/stage/ocean/bg.png',
    creator: '0x1234567890123456789012345678901234567890',
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
            height={400}
            width={400}
            className={cn(
              'mx-auto rounded-lg object-cover transition-all duration-500',
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
  const [play] = useSound('/assets/sounds/effects/swipe.mp3', { volume: 0.5 })
  const [isIndies, setIsIndies] = useState(false)

  const {
    setup: {
      clientComponents: { Stage },
    },
  } = useDojo()
  const stageEntities = useEntityQuery([Has(Stage)])
  const indiesStages = useMemo(
    () => stageEntities.map((entity) => getComponentValue(Stage, entity)),
    [stageEntities, Stage],
  )

  const stages = useMemo(() => {
    if (isIndies) {
      return indiesStages.map((stage) => ({
        id: String(stage?.id),
        name: 'Sci-Fi',
        thumbnail: '/assets/stage/sci-fi/bg.png',
        enabled: true,
        creator: truncateAddress('0x' + stage!.creator.toString(16)),
      }))
    }
    return defaultStages
  }, [isIndies, indiesStages])
  console.log(stages)

  const updateCurrent = useCallback((index: number) => {
    const TRANSITION_DURATION = 400
    setTimeout(() => {
      setCurrent(index)
    }, TRANSITION_DURATION)
  }, [])

  useEffect(() => {
    if (!api) {
      return
    }

    api.on('select', () => {
      updateCurrent(api.selectedScrollSnap())
      play()
    })
  }, [api, updateCurrent, play])

  return (
    <>
      <Carousel
        setApi={setApi}
        opts={{
          align: 'center',
          loop: false,
        }}
        className='mx-auto h-[200px] w-full max-w-[80%]'
      >
        <CarouselContent className='items-center'>
          {stages.map((stage, index) => (
            <CarouselItem
              key={index}
              className={cn(
                'min-w-fit ml-8 basis-1/3 rounded-lg pl-0 relative',
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
              <p
                className={cn(
                  stage.enabled ? 'absolute' : 'hidden',
                  'bottom-1 right-1 text-xs text-white',
                )}
              >
                Created by {truncateAddress(stage.creator ?? '')}
              </p>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className='flex w-full justify-end px-8'>
        <Button onClick={() => setIsIndies((prev) => !prev)}>
          → {isIndies ? 'Default' : 'Indies'}
        </Button>
      </div>
    </>
  )
}

export default StageCarousel
