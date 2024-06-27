import { createDojoConfig } from '@dojoengine/core'
import manifestDev from '../contracts/manifests/dev/manifest.json'
import manifestSlot from '../contracts/manifests/slot/manifest.json'

export const dojoConfig = createDojoConfig({
  toriiUrl: process.env.NEXT_PUBLIC_TORII,
  rpcUrl: process.env.NEXT_PUBLIC_NODE_URL,
  relayUrl: process.env.NEXT_PUBLIC_TORII,
  manifest: process.env.NEXT_PUBLIC_PROFILE === 'dev' ? manifestDev : manifestSlot,
})
