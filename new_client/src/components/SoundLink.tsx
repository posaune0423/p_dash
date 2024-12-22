import { Link, type LinkProps } from 'react-router-dom'
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
