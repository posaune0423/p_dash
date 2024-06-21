'use client'

import dynamic from 'next/dynamic'
import { useRef } from 'react'
import RotateInstruction from '@/components/RotateInstruction'
import { type IRefPhaserGame } from '@/game/PhaserGame'
import { useOrientation } from '@/hooks/useOrientation'

const Game = dynamic(() => import('@/components/Game'), { ssr: false })

const GamePage = () => {
  const { isLandscape } = useOrientation()
  const phaserRef = useRef<IRefPhaserGame | null>(null)

  if (!isLandscape) {
    return <RotateInstruction />
  }

  return <Game phaserRef={phaserRef} />
}

export default GamePage