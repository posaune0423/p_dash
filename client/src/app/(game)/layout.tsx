'use client'

import { useEffect, useState } from 'react'
import { dojoConfig } from '@/../dojoConfig'
import { DojoProvider } from '@/libs/dojo/DojoContext'
import { setup, type SetupResult } from '@/libs/dojo/setup'

const GameLayout = ({ children }: { children: React.ReactNode }) => {
  const [setupResult, setSetupResult] = useState<SetupResult | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const setupDojo = async () => {
      try {
        setIsLoading(true)
        const setupResult = await setup(dojoConfig)
        setSetupResult(setupResult)
      } catch (err) {
        console.error('Error setting up Dojo:', err)
        setError(err instanceof Error ? err : new Error('Unknown error occurred'))
      } finally {
        setIsLoading(false)
      }
    }

    setupDojo()
  }, [])

  if (isLoading) {
    return (
      <div className='flex h-screen items-center justify-center bg-gray-800 text-xl text-white'>
        Loading...
      </div>
    )
  }

  if (error) {
    return (
      <div className='flex h-screen items-center justify-center bg-gray-800 text-xl text-white'>
        Error: {error.message}
      </div>
    )
  }

  if (!setupResult) {
    return (
      <div className='flex h-screen items-center justify-center bg-gray-800 text-xl text-white'>
        Dojo setup failed
      </div>
    )
  }

  return <DojoProvider value={setupResult}>{children}</DojoProvider>
}

export default GameLayout
