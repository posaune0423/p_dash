'use client'

import { useEffect, useState } from 'react'
import { useOrientation } from '@/hooks/useOrientation'
import { FixedLengthQueueStorage } from '@/libs/queueStorage'
import { type GameResult } from '@/types'
import { formatDate, cn } from '@/utils'

const History = () => {
  const [gameResults, setGameResults] = useState<GameResult[]>([])
  const { isLandscape } = useOrientation()

  useEffect(() => {
    const gameResultQueue = new FixedLengthQueueStorage<GameResult>(10, 'gameResults')
    const gameResults = gameResultQueue.getQueue()
    setGameResults(gameResults)
  }, [])

  return (
    <div
      className={cn('min-h-[calc(100dvh)] px-4 text-white', {
        'px-safe': isLandscape,
      })}
    >
      {gameResults.map((item) => (
        <div key={item.id} className='flex justify-between'>
          <div>{item.stage}</div>
          <div>{formatDate(item.date)}</div>
          <div>{item.result}</div>
        </div>
      ))}
    </div>
  )
}

export default History
