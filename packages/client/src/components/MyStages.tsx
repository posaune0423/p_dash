import { useEntityQuery, useQuerySync } from '@dojoengine/react'
import { getComponentValue, HasValue } from '@dojoengine/recs'
import Image from 'next/image'
import Link from 'next/link'
import { useMemo } from 'react'
import { Button } from './ui/button'
import { useDojo } from '@/hooks/useDojo'

interface MyStagesProps {
  address?: string
}

export const MyStages: React.FC<MyStagesProps> = ({ address }) => {
  const {
    setup: {
      toriiClient,
      clientComponents: { Stage },
      contractComponents,
    },
  } = useDojo()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useQuerySync(toriiClient, [contractComponents.Stage], [])

  const stageEntities = useEntityQuery([HasValue(Stage, { creator: BigInt(address ?? 0) })])
  const stages = useMemo(() => {
    return stageEntities.map((entity) => {
      const stage = getComponentValue(Stage, entity)
      return stage
    })
  }, [stageEntities, Stage])

  return (
    <div className='mx-auto w-full max-w-md pt-8'>
      <h2 className='mb-4 text-xl font-semibold'>Stages</h2>
      <Button className='mx-auto mb-4 max-w-fit'>
        <Link href='/stage/create'>Create Stage</Link>
      </Button>
      <div className='grid grid-cols-2 gap-4'>
        {stages.map((stage) => {
          return (
            <Link key={stage?.id} href={`/stage/${stage?.id}/edit`} className='block'>
              <Image
                src='/assets/stage/sci-fi/bg.png'
                alt={`Stage ${stage?.id}`}
                width={200}
                height={100}
                className='h-auto w-full rounded-lg object-cover'
              />
              <p>{stage?.id}</p>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
