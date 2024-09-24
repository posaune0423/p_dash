import { StageEditor } from '@/components/StageEditor'

export const generateViewport = () => {
  return {
    viewportFit: 'cover',
  }
}

const EditStagePage = ({ params }: { params: { id: string } }) => {
  return (
    <div className='fixed h-screen w-screen'>
      <StageEditor stageId={params.id} />
    </div>
  )
}

export default EditStagePage
