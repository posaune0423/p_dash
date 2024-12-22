import { useEffect, useState } from 'react'

const useOrientation = () => {
  const initial =
    typeof screen !== 'undefined' &&
    (screen.orientation.type === 'landscape-primary' || screen.orientation.type === 'landscape-secondary')
  const [isLandscape, setIsLandscape] = useState(initial)

  useEffect(() => {
    const handleOrientationChange = () => {
      const newIsLandscape =
        screen.orientation.type === 'landscape-primary' || screen.orientation.type === 'landscape-secondary'
      setIsLandscape(newIsLandscape)
    }

    screen.orientation.addEventListener('change', handleOrientationChange)

    return () => {
      screen.orientation.removeEventListener('change', handleOrientationChange)
    }
  }, [])

  return { isLandscape }
}

export { useOrientation }
