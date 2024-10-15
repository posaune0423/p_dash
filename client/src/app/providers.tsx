'use client'

import { mainnet, sepolia } from '@starknet-react/chains'
import { StarknetConfig, argent, voyager } from '@starknet-react/core'
import { RpcProvider } from 'starknet'
import { ArgentMobileConnector } from 'starknetkit/argentMobile'
import { Toaster } from '@/components/ui/sonner'
import { APP_DESCRIPTION, APP_NAME } from '@/constants'
import { env } from '@/env'
import cartridgeConnector from '@/libs/cartridgeController'
import { detectMobile } from '@/utils/devices'

const Providers = ({ children }: { children: React.ReactNode }) => {
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
      <Toaster richColors position='top-center' />
      {children}
    </StarknetConfig>
  )
}

export default Providers