import Game from '@/components/Game'

export const dynamic = 'force-dynamic'

interface Props {
  params: {
    id: string
  }
}

export const generateViewport = () => {
  return {
    viewportFit: 'cover',
  }
}

const GamePage = async ({ params }: Props) => {
  return <Game stageId={params.id} />
}

export default GamePage
