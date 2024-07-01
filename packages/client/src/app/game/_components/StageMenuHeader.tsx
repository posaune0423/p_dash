'use client'

import { useAccount } from '@starknet-react/core'
import { History } from 'lucide-react'
import Avatar from '@/components/Avatar'
import { SoundLink } from '@/components/SoundLink'
import { useOrientation } from '@/hooks/useOrientation'

const StageMenuHeader = () => {
  const { address, status } = useAccount()
  const { isLandscape } = useOrientation()

  return (
    <header
      className={`absolute inset-x-0 top-0 flex items-center justify-between p-4 ${isLandscape && 'px-6'}`}
    >
      <SoundLink href='/history'>
        <History color='white' size={36} />
      </SoundLink>
      {address && (
        <SoundLink href='/my'>
          <Avatar
            address={address}
            loading={status === 'connecting' || status === 'reconnecting'}
            size={36}
          />
        </SoundLink>
      )}
    </header>
  )
}

export default StageMenuHeader
