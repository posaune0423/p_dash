import Game from '@/components/Game'

interface Props {
  params: {
    id: string
  }
}

const GamePage = async ({ params }: Props) => {
  return <Game stageId={params.id} />
}

export default GamePage
