import Image from 'next/image'
import GuestButton from '../app/home/_components/GuestButton'
import LoginButton from '@/app/home/_components/LoginButton'
import { APP_NAME } from '@/constants'

const Home = () => {
  return (
    <main className='fixed flex min-h-[calc(100dvh)] flex-col items-center justify-center space-y-4'>
      <Image
        src='/hero.png'
        alt='logo'
        className='absolute left-0 top-0 -z-10 size-full object-cover'
        width={1000}
        height={1000}
      />
      <h1>
        <Image src='/logo.png' alt='P/Dash' width={240} height={100} priority />
        <span className='sr-only'>P/Dash</span>
      </h1>

      <GuestButton />
      <LoginButton className='w-56' />

      <footer className='absolute bottom-4 text-white'>
        © {new Date().getFullYear()} {APP_NAME}
      </footer>
    </main>
  )
}

export default Home
