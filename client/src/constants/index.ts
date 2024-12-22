export const APP_NAME = 'P/Dash'
export const APP_DESCRIPTION = 'P/Dash is a game that you can play with your friends'
export const APP_URL =
  import.meta.env.NEXT_PUBLIC_PROFILE === 'dev' ? 'http://localhost:3000' : 'https://p-dash.vercel.app'

export const APP_DEFAULT_TITLE = 'P/Dash'
export const APP_TITLE_TEMPLATE = 'P/Dash | %s'

const APP_VERSION = '1.0'
const APP_REVISION = '1'

export const ZERO_ADDRESS = '0x0'
export const NAMESPACE = 'pixelaw'

export const chainId = import.meta.env.VITE_PUBLIC_PROFILE === 'dev' ? 'KATANA' : 'SEPOLIA'
export const domain = {
  name: APP_NAME,
  version: APP_VERSION,
  chainId,
  revision: APP_REVISION,
}

// Game Variables

export const GOAL_BUFFER = 500
export const GROUND_HEIGHT = 78
export const BASIC_PIXEL = 50
export const GRAVITY = 2000
