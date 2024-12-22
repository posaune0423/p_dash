import GuestButton from '@/components/pages/home/GuestButton'
import LoginButton from '@/components/pages/home/LoginButton'
import { APP_NAME } from '@/constants'

const HomePage = () => {
  return (
    <main className="fixed flex min-h-[calc(100dvh)] w-full flex-col items-center justify-center space-y-4">
      <img src="/hero.png" alt="logo" className="absolute left-0 top-0 -z-10 size-full object-cover" />

      <h1>
        <img src="/logo.png" alt="P/Dash" width={240} height={100} />
        <span className="sr-only">P/Dash</span>
      </h1>

      <GuestButton />
      <LoginButton className="w-56" />

      <footer className="absolute bottom-4 text-white">
        © {new Date().getFullYear()} {APP_NAME}
      </footer>
    </main>
  )
}

export default HomePage
