import { createDojoConfig } from '@dojoengine/core'
// import manifestDev from '../contracts/manifests/dev/deployment/manifest.json'
import manifestSlot from '../contracts/manifests/release/deployment/manifest.json'
import { env } from '@/env'

export const dojoConfig = createDojoConfig({
  toriiUrl: env.NEXT_PUBLIC_TORII,
  rpcUrl: env.NEXT_PUBLIC_NODE_URL,
  manifest: manifestSlot,
})
