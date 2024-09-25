'use client'

import { History } from 'lucide-react'
import { useMemo } from 'react'
import LoginButton from '@/app/home/_components/LoginButton'
import Avatar from '@/components/Avatar'
import { SoundLink } from '@/components/SoundLink'
import { useDojo } from '@/hooks/useDojo'
import { useOrientation } from '@/hooks/useOrientation'
import { cn } from '@/utils'

const StageMenuHeader = () => {
  const {
    setup: {
      connectedAccount,
      account: { account },
    },
  } = useDojo()
  const activeAccount = useMemo(() => connectedAccount || account, [connectedAccount, account])
  const { isLandscape } = useOrientation()

  return (
    <header
      className={cn('absolute inset-x-0 top-0 flex items-center justify-between p-4', {
        'px-safe': isLandscape,
      })}
    >
      <SoundLink href='/history'>
        <History color='white' size={36} />
      </SoundLink>
      {activeAccount?.address ? (
        <SoundLink href='/my'>
          <Avatar address={activeAccount.address} size={36} />
        </SoundLink>
      ) : (
        <LoginButton size='sm' className='text-sm' />
      )}
    </header>
  )
}

export default StageMenuHeader
