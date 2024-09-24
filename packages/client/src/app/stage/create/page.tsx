import { StageEditor } from '@/components/StageEditor'

export const generateViewport = () => {
  return {
    viewportFit: 'cover',
  }
}
const CreateStagePage = () => {
  return (
    <div className='fixed h-screen w-screen'>
      <StageEditor />
    </div>
  )
}

export default CreateStagePage
