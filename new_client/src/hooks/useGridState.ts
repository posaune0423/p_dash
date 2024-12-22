import { useState } from 'react'
import { type GridState } from '@/types'

export const useGridState = () => {
  const [gridState, setGridState] = useState<GridState>({
    offsetX: 0,
    offsetY: 0,
    scale: 0.8,
  })

  return {
    gridState,
    setGridState,
  }
}
