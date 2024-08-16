import { createDojoConfig } from '@dojoengine/core'
import manifestDev from '../contracts/manifests/dev/deployment/manifest.json'
// import manifestSlot from '../contracts/manifests/slot/manifest.json'
import { env } from '@/env'

export const dojoConfig = createDojoConfig({
  toriiUrl: env.NEXT_PUBLIC_TORII,
  rpcUrl: env.NEXT_PUBLIC_NODE_URL,
  relayUrl: env.NEXT_PUBLIC_TORII,
  manifest: manifestDev,
})
