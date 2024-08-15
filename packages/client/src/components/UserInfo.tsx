'use client'

import {
  // useBalance,
  useAccount,
  useNetwork,
} from '@starknet-react/core'
import Link from 'next/link'
import CopyButton from './CopyButton'
import { Button } from './ui/button'
import Avatar from '@/components/Avatar'
import { truncateAddress } from '@/utils'

const UserInfo = () => {
  const { address, status } = useAccount()
  // const { data: balance } = useBalance({ address })
  const { chain } = useNetwork()

  return (
    <section className='min-h-[calc(100dvh)] py-10 text-white'>
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

      <div className='mx-auto mt-8 flex w-full max-w-md flex-col justify-center space-y-3'>
        <Button className='mx-auto w-fit'>
          <Link href='/level/test/create'>Create Level</Link>
        </Button>
      </div>
    </section>
  )
}

export default UserInfo
