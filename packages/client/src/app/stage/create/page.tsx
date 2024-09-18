import { StageEditor } from '@/components/StageEditor'

export const generateViewport = () => {
  return {
    viewportFit: 'cover',
  }
}
const CreateStagePage = () => {
  return (
    <div className='h-screen w-screen fixed'>
      <StageEditor />
    </div>
  )
}

export default CreateStagePage
