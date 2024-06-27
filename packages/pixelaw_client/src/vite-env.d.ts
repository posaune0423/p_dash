/// <reference types="vite-envs/client" />


type ImportMetaEnv = {
  // Auto-generated by `npx vite-envs update-types` and hot-reloaded by the `vite-env` plugin
  // You probably want to add `/src/vite-env.d.ts` to your .prettierignore
  BASE_URL: string
  MODE: string
  DEV: boolean
  PROD: boolean
  RPC_URL: string
  TORII_URL: string
  RELAY_URL: string
  SERVER_URL: string
  MASTER_ADDRESS: string
  MASTER_PRIVATE_KEY: string
  MASTER_PUBLIC_KEY: string
  WORLD_ADDRESS: string
  ACCOUNT_CLASS_HASH: string
  FEETOKEN_ADDRESS: string
  SERVER_PORT: string
  PROFILE: string
  // @user-defined-start
  /*
   * Here you can define your own special variables
   * that would be available on `import.meta.env` but
   * that vite-envs does not know about.
   * This section will be preserved thanks to the special comments.
   * Example:
   */
  SSR: boolean;
  // @user-defined-end
}



interface ImportMeta {
  // Auto-generated by `npx vite-envs update-types`

  url: string

  readonly hot?: import('vite-envs/types/hot').ViteHotContext

  readonly env: ImportMetaEnv

  glob: import('vite-envs/types/importGlob').ImportGlobFunction
}

