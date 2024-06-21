import Image from 'next/image'
import A2HButton from './A2HButton'
import { APP_NAME } from '@/constants'

const LandingPage = () => {
  return (
    <main className='relative flex min-h-screen flex-col items-center justify-center space-y-4'>
      <Image
        src='/hero.png'
        alt='logo'
        className='absolute left-0 top-0 -z-10 size-full object-cover'
        width={1024}
        height={1024}
      />
      <h1>
      <Image src='/logo.png' alt='P/Dash' width={240} height={100} priority />
        <span className='sr-only'>P/Dash</span>
      </h1>

      <A2HButton />

      <footer className='absolute bottom-4 text-white'>
        © {new Date().getFullYear()} {APP_NAME}
      </footer>
    </main>
  )
}

export default LandingPage
