const APP_NAME = 'pixelaw'
const APP_VERSION = '1.0'
const APP_REVISION = '1'

export const chainId = import.meta.env.VITE_PUBLIC_PROFILE === 'dev' ? 'KATANA' : 'SEPOLIA'
export const domain = {
  name: APP_NAME,
  version: APP_VERSION,
  chainId,
  revision: APP_REVISION,
}
