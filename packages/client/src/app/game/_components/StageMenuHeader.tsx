'use client'

import { useAccount } from '@starknet-react/core'
import { History } from 'lucide-react'
import LoginButton from '@/app/home/_components/LoginButton'
import Avatar from '@/components/Avatar'
import { SoundLink } from '@/components/SoundLink'

const StageMenuHeader = () => {
  const { address, status } = useAccount()

  return (
    <header className='absolute inset-x-0 top-0 flex items-center justify-between p-4'>
      <SoundLink href='/history'>
        <History color='white' size={36} />
      </SoundLink>
      {address ? (
        <SoundLink href='/my'>
          <Avatar
            address={address}
            loading={status === 'connecting' || status === 'reconnecting'}
            size={36}
          />
        </SoundLink>
      ) : (
        <LoginButton size='sm' className='text-sm' />
      )}
    </header>
  )
}

export default StageMenuHeader
