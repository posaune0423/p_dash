'use client'

import React from 'react'
import { StageElements } from '../StageElements'
import { useStageEditor } from './useStageEditor'

export const StageEditor = () => {
  const {
    canvasRef,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    selectedElement,
    handleSelectElement,
  } = useStageEditor()

  return (
    <section className='relative size-full'>
      <canvas
        ref={canvasRef}
        className='fixed inset-0 h-[calc(100%-50px)] w-full bg-black/90'
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      />
      <StageElements selectedElement={selectedElement} handleSelectElement={handleSelectElement} />
    </section>
  )
}
