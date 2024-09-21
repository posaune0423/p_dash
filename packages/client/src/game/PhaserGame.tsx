'use client'

import { useRouter } from 'next/navigation'
import { forwardRef, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { ConfettiEffect } from '@/components/ConfettiEffect'
import CustomButton from '@/components/CustomButton'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { EventBus } from '@/game/EventBus'
import { StartGame } from '@/game/main'
import { useDimension } from '@/hooks/useDimension'
import { FixedLengthQueueStorage } from '@/libs/queueStorage'
import { type GameResult, type PlayerInteraction, type Obstacle } from '@/types'

export interface IRefPhaserGame {
  game: Phaser.Game | null
  scene: Phaser.Scene | null
}

interface PhaserGameProps {
  stageData: Obstacle[]
  stageId: string
}

export const PhaserGame = forwardRef<IRefPhaserGame, PhaserGameProps>(function PhaserGame(
  { stageData, stageId },
  ref,
) {
  const game = useRef<Phaser.Game | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isGameClear, setIsGameClear] = useState(false)
  const [totalDead, setTotalDead] = useState(0)
  const [distance, setDistance] = useState(0)
  const [isNewRecord, setIsNewRecord] = useState(false)
  const router = useRouter()

  const { width, height } = useDimension()

  const restartGame = () => {
    setIsDialogOpen(false)
    game.current?.scene.start('Game')
  }

  useLayoutEffect(() => {
    if (game.current === null) {
      game.current = StartGame('game-container', { stageData, width, height, stageId })

      if (typeof ref === 'function') {
        ref({ game: game.current, scene: null })
      } else if (ref) {
        ref.current = { game: game.current, scene: null }
      }
    }

    return () => {
      if (game.current) {
        game.current.destroy(true)
        if (game.current !== null) {
          game.current = null
        }
      }
    }
  }, [ref, stageData, stageId, width, height])

  useEffect(() => {
    EventBus.on('current-scene-ready', (scene_instance: Phaser.Scene) => {
      if (typeof ref === 'function') {
        ref({ game: game.current, scene: scene_instance })
      } else if (ref) {
        ref.current = { game: game.current, scene: scene_instance }
      }
    })
    EventBus.on(
      'game-clear',
      (playResult: { distance: number; interactions: PlayerInteraction[] }) => {
        const gameResultQueue = new FixedLengthQueueStorage<GameResult>(10, 'gameResults')
        gameResultQueue.enqueue({
          id: uuidv4(),
          stage: 'easy',
          date: new Date(),
          result: 'clear',
          distance: playResult.distance,
          interactions: playResult.interactions,
        })
        console.log(playResult)
        setIsGameClear(true)
        setIsDialogOpen(true)
      },
    )
    EventBus.on(
      'game-over',
      (playResult: { distance: number; interactions: PlayerInteraction[] }) => {
        const gameResultQueue = new FixedLengthQueueStorage<GameResult>(10, 'gameResults')
        const previousDistance = gameResultQueue.getLatest()?.distance ?? 0
        gameResultQueue.enqueue({
          id: uuidv4(),
          stage: 'easy',
          date: new Date(),
          result: 'death',
          distance: playResult.distance,
          interactions: playResult.interactions,
        })
        console.log(playResult)
        setTotalDead((prev) => prev + 1)
        setIsNewRecord(previousDistance < playResult.distance)
        setDistance(playResult.distance)
        setIsDialogOpen(true)
      },
    )

    return () => {
      EventBus.removeListener('current-scene-ready')
      EventBus.removeListener('game-clear')
      EventBus.removeListener('game-over')
    }
  }, [ref])

  return (
    <main className='fixed'>
      {isGameClear && <ConfettiEffect />}
      <div className='bg-slate-800' id='game-container' />
      <Dialog open={isDialogOpen}>
        <DialogContent>
          <DialogTitle>{isGameClear ? 'Game Clear!' : 'Game Over'}</DialogTitle>
          {!isGameClear && <p>Total Dead: {totalDead}</p>}
          {!isGameClear && (
            <p>
              Distance: {distance}M
              {isNewRecord && <span className='ml-2 font-medium text-yellow-600'>New Record!</span>}
            </p>
          )}
          {!isGameClear && <CustomButton onClick={restartGame}>Continue</CustomButton>}
          <CustomButton onClick={() => router.push('/game')}>Back to Menu</CustomButton>
        </DialogContent>
      </Dialog>
    </main>
  )
})
