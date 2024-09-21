import { createDojoConfig } from '@dojoengine/core'
import manifestDev from '../contracts/manifests/dev/deployment/manifest.json'
import manifestRelease from '../contracts/manifests/release/deployment/manifest.json'
import { env } from '@/env'

export const dojoConfig = createDojoConfig({
  toriiUrl: env.NEXT_PUBLIC_TORII_URL,
  rpcUrl: env.NEXT_PUBLIC_RPC_URL,
  masterAddress: env.NEXT_PUBLIC_MASTER_ADDRESS,
  masterPrivateKey: env.NEXT_PUBLIC_MASTER_PRIVATE_KEY,
  manifest: env.NEXT_PUBLIC_PROFILE === 'dev' ? manifestDev : manifestRelease,
})
