'use client'

import { mainnet, sepolia } from '@starknet-react/chains'
import { StarknetConfig, argent, voyager } from '@starknet-react/core'
import { useEffect, useState } from 'react'
import { RpcProvider } from 'starknet'
import { ArgentMobileConnector } from 'starknetkit/argentMobile'
import { dojoConfig } from '@/../dojoConfig'
import { Toaster } from '@/components/ui/sonner'
import { APP_DESCRIPTION, APP_NAME } from '@/constants'
import { env } from '@/env'
import cartridgeConnector from '@/libs/cartridgeController'
import { DojoProvider } from '@/libs/dojo/DojoContext'
import { setup, type SetupResult } from '@/libs/dojo/setup'
import { detectMobile } from '@/utils/devices'

const Providers = ({ children }: { children: React.ReactNode }) => {
  const [setupResult, setSetupResult] = useState<SetupResult | null>(null)
  const [isLoading, setIsLoading] = useState(true)
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

  const chains = [mainnet, sepolia]
  const connectors = detectMobile()
    ? [
        new ArgentMobileConnector({
          dappName: APP_NAME,
          description: APP_DESCRIPTION,
        }),
        cartridgeConnector,
      ]
    : [argent(), cartridgeConnector]

  return (
    <StarknetConfig
      chains={chains}
      provider={() => new RpcProvider({ nodeUrl: env.NEXT_PUBLIC_RPC_URL })}
      connectors={connectors}
      explorer={voyager}
      autoConnect
    >
      <DojoProvider value={setupResult}>
        <Toaster richColors position='top-center' />
        {children}
      </DojoProvider>
    </StarknetConfig>
  )
}

export default Providers
