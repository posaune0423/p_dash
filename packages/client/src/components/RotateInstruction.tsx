import Image from 'next/image'

const RotateInstruction = () => {
  return (
    <main className='fixed flex min-h-[calc(100dvh)] flex-col items-center justify-center bg-gray-800'>
      <Image src='/rotate.png' width={300} height={300} alt='rotate' />
      <p className='text-center text-2xl font-medium text-white'>
        Please rotate your device
        <br />
        to start the game
      </p>
    </main>
  )
}

export default RotateInstruction
