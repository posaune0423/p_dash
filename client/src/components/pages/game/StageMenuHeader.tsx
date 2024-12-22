import { History } from 'lucide-react'
import LoginButton from '@/components/pages/home/LoginButton'
import { Avatar } from '@/components/Avatar'
import { SoundLink } from '@/components/SoundLink'
import { useOrientation } from '@/hooks/useOrientation'
import { cn } from '@/utils'
import { useAccount } from '@starknet-react/core'

export const StageMenuHeader = () => {
  const { isLandscape } = useOrientation()
  const { address, status } = useAccount()

  return (
    <header
      className={cn('absolute inset-x-0 top-0 flex items-center justify-between p-4', {
        'px-safe': isLandscape,
      })}
    >
      <SoundLink to="/history">
        <History color="white" size={36} />
      </SoundLink>
      {address ? (
        <SoundLink to="/my">
          <Avatar address={address} loading={status === 'connecting' || status === 'reconnecting'} size={36} />
        </SoundLink>
      ) : (
        <LoginButton size="sm" className="text-sm" />
      )}
    </header>
  )
}
