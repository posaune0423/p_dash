'use client'

import { useAccount } from '@starknet-react/core'
import { History } from 'lucide-react'
import Link from 'next/link'
import Avatar from '@/components/Avatar'

const StageMenuHeader = () => {
  const { address, status } = useAccount()

  return (
    <header className='absolute inset-x-0 top-0 flex items-center justify-between p-4'>
      <Link href='/history'>
        <History color='white' size={36} />
      </Link>
      {address && (
        <Link href='/my'>
          <Avatar
            address={address}
            loading={status === 'connecting' || status === 'reconnecting'}
            size={36}
          />
        </Link>
      )}
    </header>
  )
}

export default StageMenuHeader
