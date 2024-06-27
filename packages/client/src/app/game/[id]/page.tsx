'use client'

import { GraphQLClient } from 'graphql-request'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import { shortString } from 'starknet'
import { dojoConfig } from '../../../../dojoConfig'
import { BASIC_PIXEL } from '@/constants'
import GET_PIXELS_QUERY from '@/graphql/GetPixels.graphql'

const Game = dynamic(() => import('@/components/Game'), { ssr: false })

interface Props {
  params: {
    id: string
  }
}

const gqlClient = new GraphQLClient(`${dojoConfig.toriiUrl}/graphql`)
const bounds = {
  easy: [
    [13, 42],
    [47, 48],
  ],
  normal: [
    [12, 55],
    [41, 63],
  ],
  hard: [
    [14, 42],
    [64, 142],
  ],
}

const GamePage = ({ params }: Props) => {
  const [[left, top], [right, bottom]] = bounds[params.id]
  const [obstacles, setObstacles] = useState<Obstacle[]>([])

  useEffect(() => {
    const fetchObstacles = async () => {
      const result = await gqlClient.request<GetPixelsResponse>(GET_PIXELS_QUERY, {
        first: 50000,
        where: {
          xGTE: left,
          xLTE: right,
          yGTE: top,
          yLTE: bottom,
        },
      })

      const obstacles = result!.pixelModels!.edges!.map(({ node }: { node: Pixel }) => {
        const pixel: Pixel = {
          ...node,
          text: shortString.decodeShortString(node.text),
          action: shortString.decodeShortString(node.action),
          timestamp: parseInt(node.timestamp as string, 16),
        }
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
      setObstacles(obstacles)
    }

    fetchObstacles()
  }, [])

  if (obstacles.length === 0) {
    return (
      <div className='flex h-screen w-screen items-center justify-center bg-slate-800 text-lg text-white'>
        Loading...
      </div>
    )
  }

  return <Game stageData={obstacles} />
}

export default GamePage
