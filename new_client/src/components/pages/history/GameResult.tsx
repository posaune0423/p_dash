import { useEffect, useState } from 'react'
import { useOrientation } from '@/hooks/useOrientation'
import { FixedLengthQueueStorage } from '@/libs/queueStorage'
import { type GameResult as GameResultType } from '@/types'
import { formatDate, cn } from '@/utils'

export const GameResult = () => {
  const [gameResults, setGameResults] = useState<GameResultType[]>([])
  const { isLandscape } = useOrientation()

  useEffect(() => {
    const gameResultQueue = new FixedLengthQueueStorage<GameResultType>(10, 'gameResults')
    const gameResults = gameResultQueue.getQueue()
    // gameResults.sort((a, b) => b.date.getTime() - a.date.getTime())
    setGameResults(gameResults)
  }, [])

  return (
    <div
      className={cn('min-h-[calc(100dvh)] px-4 text-white', {
        'px-safe': isLandscape,
      })}
    >
      {gameResults.map((item) => (
        <div key={item.id} className="flex justify-between">
          <div>{item.stage}</div>
          <div>{formatDate(item.date)}</div>
          <div className={cn(item.result === 'clear' ? 'text-green-500' : 'text-red-500')}>{item.result}</div>
        </div>
      ))}
    </div>
  )
}
