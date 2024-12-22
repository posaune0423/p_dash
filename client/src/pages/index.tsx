import A2HButton from '@/components/A2HButton'
import { APP_NAME } from '@/constants'

const LandingPage = () => {
  return (
    <main className="fixed flex min-h-[calc(100dvh)] w-full flex-col items-center justify-center">
      <img
        src="/hero.png"
        alt="logo"
        className="absolute left-0 top-0 -z-10 size-full object-cover"
        width={1024}
        height={1024}
      />
      <h1>
        <img src="/logo.png" alt="P/Dash" width={240} height={100} />
        <span className="sr-only">P/Dash</span>
      </h1>

      <A2HButton />

      <footer className="absolute bottom-4 text-white">
        © {new Date().getFullYear()} {APP_NAME}
      </footer>
    </main>
  )
}

export default LandingPage
