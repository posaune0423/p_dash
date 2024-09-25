import { StageEditor } from '@/components/StageEditor'

export const generateViewport = () => {
  return {
    themeColor: '#111111',
  }
}

const EditStagePage = ({ params }: { params: { id: string } }) => {
  return <StageEditor stageId={params.id} />
}

export default EditStagePage
