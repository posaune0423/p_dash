import Image from 'next/image'
import GuestButton from '../app/home/_components/GuestButton'
import LoginButton from '@/app/home/_components/LoginButton'
import { APP_NAME } from '@/constants'

const Home = () => {
  return (
    <main className='relative flex min-h-screen flex-col items-center justify-center space-y-4'>
      <Image
        src='/hero.png'
        alt='logo'
        className='absolute left-0 top-0 -z-10 size-full object-cover'
        width={1000}
        height={1000}
      />
      <h1>
        <Image src='/logo.png' alt='Pixel Dash' width={400} height={400} priority />
        <span className='sr-only'>Pixel Dash</span>
      </h1>

      <GuestButton />
      <LoginButton />

      <footer className='absolute bottom-4 text-white'>
        © {new Date().getFullYear()} {APP_NAME}
      </footer>
    </main>
  )
}

export default Home
