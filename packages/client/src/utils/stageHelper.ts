export const GRID_WIDTH = 80
export const GRID_HEIGHT = 15
export const STAGE_GAP = 2 // ステージ間の間隔
export const APP_OFFSET = { x: 10000, y: 10000 } // アプリ全体のオフセット

export const calculateStagePosition = (stageIndex: number): { x: number; y: number } => {
  // ステージを一列に並べる
  const x = stageIndex * (GRID_WIDTH + STAGE_GAP) + APP_OFFSET.x
  const y = APP_OFFSET.y

  return { x, y }
}

export const getInitBlockPosition = (stageIndex: number): { x: number; y: number } => {
  const { x: stageX, y: stageY } = calculateStagePosition(stageIndex)

  // Init Blockをステージの左上に配置
  return { x: stageX, y: stageY }
}

export const getStageArea = (stageIndex: number): { x: number; y: number; width: number; height: number } => {
  const { x: stageX, y: stageY } = calculateStagePosition(stageIndex)

  // 実際に使用できるステージ領域（Init Blockの右下から）
  return {
    x: stageX + 1,
    y: stageY + 1,
    width: GRID_WIDTH - 1,
    height: GRID_HEIGHT - 1
  }
}

export const getBlockWorldPosition = (
  stageIndex: number,
  localX: number,
  localY: number
): { x: number; y: number } => {
  const { x: stageX, y: stageY } = calculateStagePosition(stageIndex)
  return {
    x: stageX + localX,
    y: stageY + localY,
  }
}
