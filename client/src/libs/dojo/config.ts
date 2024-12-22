import { createDojoConfig } from '@dojoengine/core'

import manifestDev from '../../../../contracts/manifest_dev.json'
import manifestSepolia from '../../../../contracts/manifest_release.json'

export const manifest = import.meta.env.VITE_PUBLIC_PROFILE === 'dev' ? manifestDev : manifestSepolia

export const dojoConfig = createDojoConfig({
  toriiUrl: import.meta.env.VITE_PUBLIC_TORII_URL,
  rpcUrl: import.meta.env.VITE_PUBLIC_RPC_URL,
  accountClassHash: import.meta.env.VITE_PUBLIC_ACCOUNT_CLASS_HASH,
  manifest: import.meta.env.VITE_PUBLIC_PROFILE === 'dev' ? manifestDev : manifestSepolia,
})
