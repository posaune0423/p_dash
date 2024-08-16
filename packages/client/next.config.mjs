/** @type {import('next').NextConfig} */
import withSerwistInit from '@serwist/next'

const withSerwist = withSerwistInit({
  // Note: This is only an example. If you use Pages Router,
  // use something else that works, such as "service-worker/index.ts".
  swSrc: 'src/app/sw.ts',
  swDest: 'public/sw.js',
  disable: process.env.NODE_ENV === 'development',
})

export default withSerwist({
  // Your Next.js config
  reactStrictMode: true,
  optimizeFonts: true,
  cleanDistDir: true,
  swcMinify: true,
  experimental: {
    // typedRoutes: true,
    scrollRestoration: true,
  },
  webpack: (config, { isServer, dev }) => {
    config.module.rules.push({
      test: /\.(graphql|gql)/,
      exclude: /node_modules/,
      loader: 'graphql-tag/loader',
    })

    config.output.webassemblyModuleFilename =
      isServer && !dev ? '../static/pkg/[modulehash].wasm' : 'static/pkg/[modulehash].wasm'

    // Since Webpack 5 doesn't enable WebAssembly by default, we should do it manually
    config.experiments = { ...config.experiments, asyncWebAssembly: true, topLevelAwait: true }

    return config
  },
})
