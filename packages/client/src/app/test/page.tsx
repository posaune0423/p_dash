'use client'

import { GraphQLClient } from 'graphql-request'
import { useEffect } from 'react'
import { shortString } from 'starknet'
import { dojoConfig } from '../../../dojoConfig'
import GET_PIXELS_QUERY from '@/graphql/GetPixels.graphql'

export type Pixel = {
  action: string
  color: number | string
  owner: string
  text: string
  timestamp: number | string
  x: number
  y: number
}

type GetPixelsResponse = {
  pixelModels: {
    edges: Array<{
      node: Pixel
    }>
  }
}

const Test = () => {
  useEffect(() => {
    const effect = async () => {
      const bounds = [
        [14, 42],
        [64, 142],
      ]

      const [[left, top], [right, bottom]] = bounds

      const gqlClient = new GraphQLClient(`${dojoConfig.toriiUrl}/graphql`)

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
        return { x: pixel.x, y: pixel.y, type: block_type } as Obstacle
      })

      console.log(obstacles)
    }

    effect()
  }, [])

  return <div>Test</div>
}

export default Test
