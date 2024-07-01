import Link from 'next/link'
import { SoundButton } from './SoundButton'
import ImportButton from '@/app/game/_components/ImportButton'
import StageMenuHeader from '@/app/game/_components/StageMenuHeader'

const StageMenu = () => {
  return (
    <main className='relative'>
      <StageMenuHeader />
      <section className='flex min-h-[calc(100dvh)] w-full flex-col items-center justify-center space-y-6 bg-gray-800'>
        <h2 className='mb-8 text-center text-3xl font-medium text-white'>Choose Level</h2>
        <SoundButton
          className='w-60 border-2 !bg-gray-800 !text-white'
          size='xl'
          variant='outline'
          asChild
        >
          <Link href='/game/easy'>Easy</Link>
        </SoundButton>
        <SoundButton
          className='w-60 border-2 !bg-gray-800 !text-white'
          size='xl'
          variant='outline'
          disabled
          asChild
        >
          <Link href='/game/normal'>Normal</Link>
        </SoundButton>
        <SoundButton
          className='w-60 border-2 !bg-gray-800 !text-white'
          size='xl'
          variant='outline'
          disabled
          asChild
        >
          <Link href='/game/hard'>Hard</Link>
        </SoundButton>
        <ImportButton />
      </section>
    </main>
  )
}

export default StageMenu
