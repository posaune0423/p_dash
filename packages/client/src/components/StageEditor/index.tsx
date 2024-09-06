'use client'

import React from 'react'
import { usePixelViewer } from './usePixelViewer'
import { type Color } from '@/types'

interface StageEditorProps {
  backgroundColor?: Color
  gridColor?: Color
}

export const StageEditor: React.FC<StageEditorProps> = () => {
  const {
    canvasRef,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleWheel,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  } = usePixelViewer()

  return (
    <section className='relative size-full'>
      <canvas
        ref={canvasRef}
        className='bottom fixed inset-x-0 top-0 h-screen w-full bg-black/80'
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onWheel={handleWheel}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onScroll={(e) => {
          console.log('scroll', e)
        }}
      />
    </section>
  )
}
