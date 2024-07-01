import { ArrowLeft } from 'lucide-react'
import { SoundLink } from '@/components/SoundLink'
import UserInfo from '@/components/UserInfo'

const MyPage = () => {
  return (
    <main className='relative w-full bg-gray-800 p-6'>
      <SoundLink href='/game'>
        <ArrowLeft className='absolute left-4 top-4 mt-3' color='white' />
      </SoundLink>
      <h1 className='text-center text-2xl font-bold text-white'>Account Info</h1>

      <UserInfo />
    </main>
  )
}

export default MyPage
