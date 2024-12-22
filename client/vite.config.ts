import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import topLevelAwait from 'vite-plugin-top-level-await'
import wasm from 'vite-plugin-wasm'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    topLevelAwait(),
    wasm(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: false,
      },
      manifest: {
        name: 'P/Dash',
        short_name: 'P/Dash',
        start_url: '/',
        display: 'standalone',
        background_color: '#1e293b',
        theme_color: '#1e293b',
        lang: 'en',
        scope: '/',
        orientation: 'landscape-primary',
        description: 'P/Dash is a game that you can play with your friends',
        icons: [
          {
            src: '/icon.svg',
            sizes: '192x192',
            type: 'image/svg+xml',
            purpose: 'any',
          },
          {
            src: '/icon.svg',
            sizes: '512x512',
            type: 'image/svg+xml',
            purpose: 'any',
          },
          {
            src: '/icon.svg',
            sizes: '192x192',
            type: 'image/svg+xml',
            purpose: 'maskable',
          },
          {
            src: '/icon.svg',
            sizes: '512x512',
            type: 'image/svg+xml',
            purpose: 'maskable',
          },
        ],
      },
      workbox: {
        maximumFileSizeToCacheInBytes: 4000000, // 4MB
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
})
