'use client'

import { useQuerySync, useEntityQuery } from '@dojoengine/react'
import { Has } from '@dojoengine/recs'
import {
  // useBalance,
  useAccount,
  useNetwork,
} from '@starknet-react/core'
import Image from 'next/image'
import Link from 'next/link'
import Avatar from './Avatar'
import CopyButton from './CopyButton'
import { Button } from './ui/button'
import { useDojo } from '@/hooks/useDojo'
import { truncateAddress } from '@/utils'

const UserInfo = () => {
  const { address, status } = useAccount()
  // const { data: balance } = useBalance({ address })
  const { chain } = useNetwork()

  const {
    setup: {
      toriiClient,
      clientComponents: { StageId },
      contractComponents,
    },
  } = useDojo()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useQuerySync(toriiClient, [contractComponents.StageId], [])

  const stageIds = useEntityQuery([Has(StageId)])
  console.log(stageIds)

  return (
    <section className='h-[calc(100vh-64px)] overflow-y-auto py-10 text-white'>
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

      <div className='mx-auto w-full max-w-md pt-8'>
        <h2 className='mb-4 text-xl font-semibold'>Stages</h2>
        <Button className='mx-auto mb-4 max-w-fit'>
          <Link href='/stage/create'>Create Stage</Link>
        </Button>
        <div className='grid grid-cols-2 gap-4'>
          {stageIds.map((stageId) => (
            <Link key={stageId} href={`/stage/${stageId}/edit`} className='block'>
              <Image
                src='/assets/stage/sci-fi/bg.png'
                alt={`Stage ${stageId}`}
                width={200}
                height={100}
                className='h-auto w-full rounded-lg object-cover'
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default UserInfo
