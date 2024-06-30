import { type MetadataRoute } from 'next'

export default function manifet(): MetadataRoute.Manifest {
  return {
    name: 'P/Dash',
    short_name: 'P/Dash',
    start_url: '/',
    display: 'standalone',
    background_color: '#000000',
    lang: 'en',
    scope: '/',
    orientation: 'landscape-primary',
    description: "Very basic React 2d game that can be installed on user's phone screen",
    theme_color: '#000000',
    icons: [
      {
        src: '/pwa-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/pwa-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/pwa-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/pwa-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  }
}
