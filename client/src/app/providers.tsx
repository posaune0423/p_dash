'use client'

import { GoogleAnalytics } from '@next/third-parties/google'
import { sepolia } from '@starknet-react/chains'
import { StarknetConfig, argent, voyager } from '@starknet-react/core'
import { RpcProvider } from 'starknet'
import { ArgentMobileConnector } from 'starknetkit/argentMobile'
import { Toaster } from '@/components/ui/sonner'
import { APP_DESCRIPTION, APP_NAME } from '@/constants'
import { env } from '@/env'
import cartridgeConnector from '@/libs/cartridgeController'
import { detectMobile } from '@/utils/devices'

const Providers = ({ children }: { children: React.ReactNode }) => {
  const chains = [sepolia]
  const connectors = detectMobile()
    ? [
        new ArgentMobileConnector({
          dappName: APP_NAME,
          description: APP_DESCRIPTION,
        }),
        cartridgeConnector,
      ]
    : [argent()]

  return (
    <StarknetConfig
      chains={chains}
      provider={() => new RpcProvider({ nodeUrl: env.NEXT_PUBLIC_RPC_URL })}
      connectors={connectors}
      explorer={voyager}
      autoConnect
    >
      <GoogleAnalytics gaId={env.NEXT_PUBLIC_GA_ID} />
      <Toaster richColors position='top-center' />
      {children}
    </StarknetConfig>
  )
}

export default Providers
