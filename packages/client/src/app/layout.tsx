import { Silkscreen } from 'next/font/google'
import './globals.scss'
import Providers from './providers'
import { metadataConfig } from '@/constants'

const silkscreen = Silkscreen({ subsets: ['latin'], weight: ['400', '700'] })

export const metadata = metadataConfig
// export const viewport = viewportConfig

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={silkscreen.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
