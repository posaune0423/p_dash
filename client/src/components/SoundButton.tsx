import { useSound } from 'use-sound'
import { Button, type ButtonProps } from './ui/button'

const SoundButton = ({ children, ...props }: ButtonProps) => {
  const [play] = useSound('/assets/sounds/effects/click.mp3')

  return (
    <Button {...props} onClick={() => play()}>
      {children}
    </Button>
  )
}

export { SoundButton }
