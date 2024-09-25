'use client'

import React from 'react'
import { StageElements } from '../StageElements'
import { useStageEditor } from './useStageEditor'

export const StageEditor = ({ stageId }: { stageId?: string }) => {
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
    <section className='fixed inset-0' style={{ width: '100%', height: '100%' }}>
      <canvas
        ref={canvasRef}
        className='absolute inset-0 touch-none bg-black/90'
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
