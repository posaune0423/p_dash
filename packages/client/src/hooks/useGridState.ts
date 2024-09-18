import { setIdleTask } from 'idle-task'
import { useEffect, useState } from 'react'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { type GridState } from '@/types'

export const useGridState = () => {
  // LocalStorage
  const [storedLastGridState, setStoredLastGridState] = useLocalStorage('lastGridState', {
    offsetX: 0,
    offsetY: 0,
    scale: 0.8,
  })
  const [gridState, setGridState] = useState<GridState>(storedLastGridState)

  setIdleTask(() => {
    setStoredLastGridState(gridState)
  })

  useEffect(() => {
    // Initialize the position of the canvas
    setGridState(storedLastGridState)
  }, [])

  return {
    gridState,
    setGridState,
    setStoredLastGridState,
  }
}
