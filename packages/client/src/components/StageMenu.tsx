import StageCarousel from './StageCarousel'
import StageMenuHeader from '@/app/game/_components/StageMenuHeader'

const StageMenu = () => {
  return (
    <main className='relative'>
      <StageMenuHeader />
      <section className='flex min-h-[calc(100dvh)] w-full flex-col items-center justify-center space-y-6 bg-gray-800'>
        <h2 className='mb-8 text-center text-3xl font-medium text-white'>Choose Stage</h2>
        <StageCarousel />
      </section>
    </main>
  )
}

export default StageMenu
