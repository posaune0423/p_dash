import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import cartridgeConnector from './libs/cartridgeController'
import { StarknetConfig, voyager } from '@starknet-react/core'
import { RpcProvider } from 'starknet'
import { sepolia } from '@starknet-react/chains'
import { dojoConfig } from './libs/dojo/config.ts'
import { init, SchemaType } from '@dojoengine/sdk'
import { schema } from './libs/dojo/typescript/models.gen.ts'
import { domain } from './constants/index.ts'
import { Toaster } from 'sonner'
import ReactGA from 'react-ga4'

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { routes } from './routes.ts'

ReactGA.initialize(import.meta.env.VITE_PUBLIC_GA_ID)

const rootElement = document.getElementById('root')
if (!rootElement) throw new Error('React root not found')

const root = createRoot(rootElement as HTMLElement)

const main = async () => {
  const sdk = await init<SchemaType>(
    {
      client: {
        rpcUrl: dojoConfig.rpcUrl,
        toriiUrl: dojoConfig.toriiUrl,
        relayUrl: dojoConfig.relayUrl,
        worldAddress: dojoConfig.manifest.world.address,
      },
      domain,
    },
    schema,
  )
  console.log(sdk)

  return (
    <StrictMode>
      <StarknetConfig
        chains={[sepolia]}
        provider={() => new RpcProvider({ nodeUrl: import.meta.env.VITE_PUBLIC_RPC_URL })}
        connectors={[cartridgeConnector]}
        explorer={voyager}
        autoConnect
      >
        <BrowserRouter>
          <Routes>
            {routes.map(({ path, Component }, i) => (
              <Route key={i} path={path} element={<Component />} />
            ))}
          </Routes>
        </BrowserRouter>
        <Toaster richColors position="bottom-right" closeButton />
      </StarknetConfig>
    </StrictMode>
  )
}

root.render(await main())
