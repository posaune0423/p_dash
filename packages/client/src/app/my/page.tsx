import { ArrowLeft } from 'lucide-react'
import { SoundLink } from '@/components/SoundLink'
import UserInfo from '@/components/UserInfo'

const MyPage = () => {
  return (
    <main className='fixed w-full bg-gray-800 p-4 px-safe'>
      <SoundLink href='/game'>
        <ArrowLeft className='absolute left-4 top-4' size={36} color='white' />
      </SoundLink>
      <h1 className='text-center text-2xl font-bold text-white'>Account Info</h1>
      <UserInfo />
    </main>
  )
}

export default MyPage
