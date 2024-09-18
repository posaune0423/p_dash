import { StageEditor } from '@/components/StageEditor'

const EditStagePage = ({ params }: { params: { id: string } }) => {
  return (
    <div className='h-screen w-screen'>
      <StageEditor stageId={params.id} />
    </div>
  )
}

export default EditStagePage
