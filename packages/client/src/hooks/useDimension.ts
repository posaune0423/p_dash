import { useState, useEffect } from 'react'

interface Dimension {
  width: number
  height: number
  isDesktop: boolean
}

const useDimension = (): Dimension => {
  const [dimension, setDimension] = useState<Dimension>({
    width: window.innerWidth,
    height: window.innerHeight,
    isDesktop: window.innerWidth > 768,
  })

  useEffect(() => {
    const handleResize = () => {
      setDimension({
        width: window.innerWidth,
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
