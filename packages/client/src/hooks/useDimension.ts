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
      // add delay for iOS Safari
      setTimeout(() => {
        setDimension({
          width: window.innerWidth,
          height: window.innerHeight,
          isDesktop: window.innerWidth > 768,
        })
      }, 10)
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
