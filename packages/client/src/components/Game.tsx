import { type IRefPhaserGame, PhaserGame } from '@/game/PhaserGame'

// NOTE: JUST Wrapper component of PhaserGame cuz somehow dynamic import does not work with Ref
const Game = ({
  phaserRef,
  stageId,
}: {
  phaserRef: React.RefObject<IRefPhaserGame>
  stageId: string
}) => {
  return <PhaserGame stageId={stageId} ref={phaserRef} />
}

export default Game
