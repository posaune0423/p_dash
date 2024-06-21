import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import History from '@/components/History'

const HistoryPage = () => {
  return (
    <main className='relative w-full bg-gray-800 p-6'>
      <Link href='/game'>
        <ArrowLeft className='absolute left-4 top-4 mt-3' color='white' />
      </Link>
      <h1 className='mb-8 text-center text-2xl font-bold text-white'>History</h1>
      <History />
    </main>
  )
}

export default HistoryPage
