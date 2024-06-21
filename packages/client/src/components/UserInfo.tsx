'use client'

import {
  // useBalance,
  useAccount,
  useNetwork,
} from '@starknet-react/core'
import CopyButton from './CopyButton'
import Avatar from '@/components/Avatar'
import { truncateAddress } from '@/utils'

const UserInfo = () => {
  const { address, status } = useAccount()
  // const { data: balance } = useBalance({ address })
  const { chain } = useNetwork()

  return (
    <section className='min-h-screen py-10 text-white'>
      <div className='mx-auto mb-8 w-fit'>
        {address && (
          <Avatar
            address={address}
            loading={status === 'connecting' || status === 'reconnecting'}
            size={100}
          />
        )}
      </div>

      {address && (
        <div className='mx-auto flex w-full max-w-md flex-col justify-center space-y-3'>
          <div className='flex items-center gap-3'>
            <p>Address: {truncateAddress(address)}</p>
            <CopyButton value={address} />
          </div>
          {/* <h2>Balance: {balance?.formatted ?? 0}</h2> */}
          <p>Network: {chain?.name}</p>
        </div>
      )}
    </section>
  )
}

export default UserInfo
