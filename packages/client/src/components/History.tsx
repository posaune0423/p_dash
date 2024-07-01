'use client'

import { useEffect, useState } from 'react'
import { useOrientation } from '@/hooks/useOrientation'
import { FixedLengthQueueStorage } from '@/lib/queueStorage'
import { formatDate } from '@/utils'

const History = () => {
  const [gameResults, setGameResults] = useState<GameResult[]>([])
  const { isLandscape } = useOrientation()

  useEffect(() => {
    const gameResultQueue = new FixedLengthQueueStorage<GameResult>(10, 'gameResults')
    const gameResults = gameResultQueue.getQueue()
    setGameResults(gameResults)
  }, [])

  return (
    <div className={`min-h-[calc(100dvh)] text-white ${isLandscape && 'px-10'}`}>
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
