'use client'

import { mainnet, sepolia } from '@starknet-react/chains'
import { StarknetConfig, publicProvider, argent, braavos, voyager } from '@starknet-react/core'
import { useEffect, useState } from 'react'
import { ArgentMobileConnector } from 'starknetkit/argentMobile'
import { WebWalletConnector } from 'starknetkit/webwallet'
import { dojoConfig } from '@/../dojoConfig'
import { Toaster } from '@/components/ui/sonner'
import { APP_DESCRIPTION, APP_NAME } from '@/constants'
import { DojoProvider } from '@/libs/dojo/DojoContext'
import { setup, type SetupResult } from '@/libs/dojo/setup'
import { detectMobile } from '@/utils/devices'

const Providers = ({ children }: { children: React.ReactNode }) => {
  const [dojo, setDojo] = useState<SetupResult | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const setupDojo = async () => {
      try {
        setIsLoading(true)
        const setupResult = await setup(dojoConfig)
        setDojo(setupResult)
        console.log(setupResult)
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
      <div className='bg-primary flex h-screen items-center justify-center text-xl text-white'>
        Loading...
      </div>
    )
  }

  if (error) {
    return (
      <div className='bg-primary flex h-screen items-center justify-center text-xl text-white'>
        Error: {error.message}
      </div>
    )
  }

  if (!dojo) {
    return (
      <div className='bg-primary flex h-screen items-center justify-center text-xl text-white'>
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
        new WebWalletConnector({ url: 'https://web.argent.xyz' }),
      ]
    : [argent(), braavos()]

  return (
    <StarknetConfig
      chains={chains}
      provider={publicProvider()}
      connectors={connectors}
      explorer={voyager}
      autoConnect={true}
    >
      <DojoProvider value={dojo}>
        <Toaster richColors position='top-center' />
        {children}
      </DojoProvider>
    </StarknetConfig>
  )
}

export default Providers
