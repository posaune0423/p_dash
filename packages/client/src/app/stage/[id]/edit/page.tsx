import { StageEditor } from '@/components/StageEditor'

const EditStagePage = ({ params }: { params: { id: string } }) => {
  return (
    <div className='h-screen w-screen'>
      <StageEditor stageId={Number(params.id)} />
    </div>
  )
}

export default EditStagePage
