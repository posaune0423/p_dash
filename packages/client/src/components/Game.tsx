'use client'

import { useRef } from 'react'
import RotateInstruction from './RotateInstruction'
import { type IRefPhaserGame, PhaserGame } from '@/game/PhaserGame'
import { useOrientation } from '@/hooks/useOrientation'

// NOTE: JUST Wrapper component of PhaserGame cuz somehow dynamic import does not work with Ref
const Game = ({ stageData, stage }: { stageData: Obstacle[]; stage: string }) => {
  const { isLandscape } = useOrientation()
  const phaserRef = useRef<IRefPhaserGame | null>(null)

  if (!isLandscape) {
    return <RotateInstruction />
  }

  return <PhaserGame ref={phaserRef} stageData={stageData} stage={stage} />
}

export default Game
