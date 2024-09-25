'use client'

import React from 'react'
import { StageElements } from '../StageElements'
import { useStageEditor } from './useStageEditor'
import { useDimension } from '@/hooks/useDimension'

export const StageEditor = ({ stageId }: { stageId?: string }) => {
  const { width, height } = useDimension()

  const {
    canvasRef,
    selectedElement,
    currentBlocks,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    handleSelectElement,
  } = useStageEditor(stageId)

  return (
    <section
      className='relative inset-0'
      style={{ width, height, overflow: 'hidden' }}
    >
      <canvas
        ref={canvasRef}
        className='absolute inset-0 h-[calc(100%-50px)] w-full touch-none bg-black/90'
        style={{
          boxSizing: 'border-box',
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      />
      <StageElements
        stageId={stageId}
        currentBlocks={currentBlocks}
        selectedElement={selectedElement}
        handleSelectElement={handleSelectElement}
      />
    </section>
  )
}
