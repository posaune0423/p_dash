'use client'

import { mainnet, sepolia } from '@starknet-react/chains'
import {
  StarknetConfig,
  publicProvider,
  argent,
  braavos,
  voyager,
} from '@starknet-react/core'
import { ArgentMobileConnector } from 'starknetkit/argentMobile'
import { WebWalletConnector } from 'starknetkit/webwallet'
import { Toaster } from '@/components/ui/sonner'
import { APP_DESCRIPTION, APP_NAME } from '@/constants'
import { detectMobile } from '@/utils/devices'

const Providers = ({ children }: { children: React.ReactNode }) => {
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
      <Toaster richColors position="top-center" />
      {children}
    </StarknetConfig>
  )
}

export default Providers
