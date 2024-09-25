import { StageEditor } from '@/components/StageEditor'

export const generateViewport = () => {
  return {
    viewportFit: 'cover',
  }
}

const EditStagePage = ({ params }: { params: { id: string } }) => {
  return <StageEditor stageId={params.id} />
}

export default EditStagePage
