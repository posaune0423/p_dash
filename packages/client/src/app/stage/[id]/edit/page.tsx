import { StageEditor } from '@/components/StageEditor'

export const generateViewport = () => {
  return {
    viewportFit: 'cover',
  }
}

const EditStagePage = ({ params }: { params: { id: string } }) => {
  return (
    <main className='size-full'>
      <StageEditor stageId={params.id} />
    </main>
  )
}

export default EditStagePage
