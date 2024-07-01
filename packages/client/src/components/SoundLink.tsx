'use client'

import Link, { type LinkProps } from 'next/link'
import { type PropsWithChildren } from 'react'
import { useSound } from 'use-sound'

const SoundLink = ({ children, ...props }: PropsWithChildren<LinkProps>) => {
  const [play] = useSound('/assets/sounds/effects/click.mp3')
  return (
    <Link {...props} onClick={() => play()}>
      {children}
    </Link>
  )
}

export { SoundLink }
