import { type Viewport, type Metadata } from 'next'
import { env } from '@/env'

export const APP_NAME = 'P/Dash'
export const APP_DESCRIPTION = 'P/Dash is a game that you can play with your friends'
export const APP_URL =
  env.NEXT_PUBLIC_PROFILE === 'dev' ? 'http://localhost:3000' : 'https://p-dash.vercel.app'

export const APP_DEFAULT_TITLE = 'P/Dash'
export const APP_TITLE_TEMPLATE = 'P/Dash | %s'

export const GOAL_BUFFER = 500
export const GROUND_HEIGHT = 78
export const BASIC_PIXEL = 50
export const GRAVITY = 2000

export const metadataConfig: Metadata = {
  applicationName: APP_NAME,
  icons: {
    icon: '/favicon.png',
    apple: '/favicon.png',
  },
  metadataBase: new URL(APP_URL),
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: APP_DEFAULT_TITLE,
    // startUpImage: [],
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: 'website',
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: 'summary',
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
}

export const viewportConfig: Viewport = {
  themeColor: '#1e293b',
  viewportFit: 'cover',
  width: 'device-width',
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export const ZERO_ADDRESS = '0x0'
export const NAMESPACE = 'pixelaw'
