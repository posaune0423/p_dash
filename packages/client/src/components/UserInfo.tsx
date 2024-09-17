'use client'

import {
  // useBalance,
  useNetwork,
} from '@starknet-react/core'
import { useMemo } from 'react'
import Avatar from './Avatar'
import CopyButton from './CopyButton'
import { MyStages } from './MyStages'
import { useDojo } from '@/hooks/useDojo'
import { truncateAddress } from '@/utils'

const UserInfo = () => {
  const {
    setup: {
      account: { account },
      connectedAccount,
    },
  } = useDojo()
  const activeAccount = useMemo(() => connectedAccount || account, [connectedAccount, account])
  // const { data: balance } = useBalance({ address })
  const { chain } = useNetwork()

  return (
    <section className='h-[calc(100vh-64px)] overflow-y-auto py-10 text-white'>
      <div className='mx-auto mb-8 w-fit'>
        {activeAccount?.address && (
          <Avatar
            address={activeAccount.address}
            loading={status === 'connecting' || status === 'reconnecting'}
            size={100}
          />
        )}
      </div>

      {activeAccount?.address && (
        <div className='mx-auto flex w-full max-w-md flex-col justify-center space-y-3'>
          <div className='flex items-center gap-3'>
            <p>Address: {truncateAddress(activeAccount.address)}</p>
            <CopyButton value={activeAccount.address} />
          </div>
          {/* <h2>Balance: {balance?.formatted ?? 0}</h2> */}
          <p>Network: {chain?.name}</p>
        </div>
      )}

      <MyStages address={activeAccount?.address} />
    </section>
  )
}

export default UserInfo
