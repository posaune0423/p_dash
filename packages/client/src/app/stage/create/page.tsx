import { StageEditor } from '@/components/StageEditor'

export const generateViewport = () => {
  return {
    viewportFit: 'cover',
  }
}
const CreateStagePage = () => {
  return (
    <main className='size-full'>
      <StageEditor />
    </main>
  )
}

export default CreateStagePage
