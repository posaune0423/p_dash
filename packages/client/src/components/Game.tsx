import { type IRefPhaserGame, PhaserGame } from '@/game/PhaserGame'

// NOTE: JUST Wrapper component of PhaserGame cuz somehow dynamic import does not work with Ref
const Game = ({ phaserRef }: { phaserRef: React.RefObject<IRefPhaserGame> }) => {
  return <PhaserGame ref={phaserRef} />
}

export default Game
