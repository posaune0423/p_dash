'use client'

import { ArrowLeft } from 'lucide-react'
import History from '@/components/History'
import { SoundLink } from '@/components/SoundLink'
import { useOrientation } from '@/hooks/useOrientation'
import { cn } from '@/utils'

const HistoryPage = () => {
  const { isLandscape } = useOrientation()

  return (
    <main className='fixed w-full bg-gray-800 p-4'>
      <SoundLink href='/game'>
        <ArrowLeft
          className={cn('absolute left-4 top-4', {
            'left-safe': isLandscape,
          })}
          color='white'
          size={36}
        />
      </SoundLink>
      <h1 className='mb-8 text-center text-2xl font-bold text-white'>History</h1>
      <History />
    </main>
  )
}

export default HistoryPage
