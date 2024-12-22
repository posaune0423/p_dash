import { StageCarousel } from '@/components/pages/game/StageCarousel'
import { StageMenuHeader } from '@/components/pages/game/StageMenuHeader'

const GameHomePage = () => {
  return (
    <main className="fixed w-full">
      <StageMenuHeader />
      <section className="flex min-h-[calc(100dvh)] w-full flex-col items-center justify-center space-y-6 bg-gray-800">
        <h2 className="text-center text-3xl font-medium text-white">Choose Stage</h2>
        <StageCarousel />
      </section>
    </main>
  )
}

export default GameHomePage
