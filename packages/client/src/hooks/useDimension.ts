import { useState, useLayoutEffect } from 'react'

interface Dimension {
  width: number
  height: number
  isDesktop: boolean
}

const useDimension = (): Dimension => {
  const [dimension, setDimension] = useState<Dimension>({
    width: window.visualViewport?.width || window.innerWidth,
    height: window.innerHeight,
    isDesktop: window.innerWidth > 768,
  })

  useLayoutEffect(() => {
    const handleResize = () => {
      setDimension({
        width: window.visualViewport?.width || window.innerWidth,
        height: window.innerHeight,
        isDesktop: window.innerWidth > 768,
      })
    }

    window.addEventListener('resize', handleResize)
    window.addEventListener('orientationchange', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('orientationchange', handleResize)
    }
  }, [])

  return dimension
}

export { useDimension }
