import { StageEditor } from '@/components/StageEditor'

const EditStagePage = ({ params }: { params: { id: string } }) => {
  return <StageEditor stageId={params.id} />
}

export default EditStagePage
