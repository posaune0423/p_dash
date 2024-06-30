'use client'

import { useRouter } from 'next/navigation'
import { forwardRef, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import CustomButton from '@/components/CustomButton'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
// import { mockStageData } from '@/constants/mock'
import { EventBus } from '@/game/EventBus'
import { StartGame } from '@/game/main'
import { useDimension } from '@/hooks/useDimension'
import { FixedLengthQueueStorage } from '@/lib/queueStorage'

export interface IRefPhaserGame {
  game: Phaser.Game | null
  scene: Phaser.Scene | null
}

interface PhaserGameProps {
  stageData: Obstacle[]
}

export const PhaserGame = forwardRef<IRefPhaserGame, PhaserGameProps>(function PhaserGame(
  { stageData },
  ref,
) {
  const game = useRef<Phaser.Game | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isGameClear, setIsGameClear] = useState(false)
  const [totalDead, setTotalDead] = useState(0)
  const router = useRouter()

  const { width, height } = useDimension()

  const restartGame = () => {
    setIsDialogOpen(false)
    game.current?.scene.start('Game')
  }

  useLayoutEffect(() => {
    if (game.current === null) {
      game.current = StartGame('game-container', { stageData, width, height })

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
  }, [ref])

  useEffect(() => {
    EventBus.on('current-scene-ready', (scene_instance: Phaser.Scene) => {
      if (typeof ref === 'function') {
        ref({ game: game.current, scene: scene_instance })
      } else if (ref) {
        ref.current = { game: game.current, scene: scene_instance }
      }
    })
    EventBus.on('game-clear', () => {
      const gameResultQueue = new FixedLengthQueueStorage<GameResult>(10, 'gameResults')
      gameResultQueue.enqueue({
        id: uuidv4(),
        stage: 'easy',
        date: new Date(),
        result: 'clear',
      })
      setIsGameClear(true)
      setIsDialogOpen(true)
    })
    EventBus.on('game-over', () => {
      const gameResultQueue = new FixedLengthQueueStorage<GameResult>(10, 'gameResults')
      gameResultQueue.enqueue({
        id: uuidv4(),
        stage: 'easy',
        date: new Date(),
        result: 'death',
      })
      setIsDialogOpen(true)
      setTotalDead((prev) => prev + 1)
    })

    return () => {
      EventBus.removeListener('current-scene-ready')
      EventBus.removeListener('game-clear')
      EventBus.removeListener('game-over')
    }
  }, [ref])

  return (
    <main>
      <div id='game-container' />
      <Dialog open={isDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{isGameClear ? 'Game Clear!' : 'Game Over'}</DialogTitle>
            {!isGameClear && <p>Total Dead: {totalDead}</p>}
            {!isGameClear && <CustomButton onClick={restartGame}>Continue</CustomButton>}
            <CustomButton onClick={() => router.push('/game')}>Back to Menu</CustomButton>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </main>
  )
})
