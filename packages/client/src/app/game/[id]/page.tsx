import { GraphQLClient } from 'graphql-request'
import { shortString } from 'starknet'
import { dojoConfig } from '../../../../dojoConfig'
import Game from '@/components/Game'
import { BASIC_PIXEL } from '@/constants'
import { mockStageData } from '@/constants/mock'
import GET_PIXELS_QUERY from '@/graphql/GetPixels.graphql'

export const dynamic = 'force-dynamic'

interface Props {
  params: {
    id: string
  }
}
// FIX: these number can be fetched from Stage model
const bounds = {
  'sci-fi': [
    [14, 19],
    [80, 28],
  ],
  desert: [
    [14, 19],
    [80, 28],
  ],
  jungle: [
    [14, 42],
    [64, 142],
  ],
}

export const generateViewport = () => {
  return {
    viewportFit: 'cover',
  }
}

const GamePage = async ({ params }: Props) => {
  const [[left, top], [right, bottom]] = bounds[params.id]
  let obstacles: Obstacle[] = []

  if (params.id === 'sci-fi') {
    obstacles = mockStageData[params.id]
  } else {
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

    // FIX: Fetch Stage model directly and detect Block type
    obstacles = result!.pixelModels!.edges!.map(({ node }: { node: Pixel }) => {
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
  }

  return <Game stageData={obstacles} stage={params.id} />
}

export default GamePage
