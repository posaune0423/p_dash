/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_PUBLIC_TORII_URL: string
  readonly VITE_PUBLIC_RPC_URL: string
  readonly VITE_PUBLIC_ACCOUNT_CLASS_HASH: string
  readonly VITE_PUBLIC_FEE_TOKEN_ADDRESS: string
  readonly VITE_PUBLIC_PROFILE: string
  readonly VITE_PUBLIC_GA_ID: string
  readonly VITE_PUBLIC_DEBUG: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
