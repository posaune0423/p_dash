'use client'

import { ArrowLeft } from 'lucide-react'
import { SoundLink } from '@/components/SoundLink'
import UserInfo from '@/components/UserInfo'
import { useOrientation } from '@/hooks/useOrientation'
import { cn } from '@/utils'

const MyPage = () => {
  const { isLandscape } = useOrientation()

  return (
    <main className='fixed w-full bg-gray-800 p-4'>
      <SoundLink href='/game'>
        <ArrowLeft
          className={cn('absolute left-4 top-4', {
            'left-safe': isLandscape,
          })}
          size={36}
          color='white'
        />
      </SoundLink>
      <h1 className='text-center text-2xl font-bold text-white'>Account Info</h1>
      <UserInfo />
    </main>
  )
}

export default MyPage
