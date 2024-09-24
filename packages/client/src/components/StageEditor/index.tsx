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
    <section className='fixed size-full'>
      <canvas
        ref={canvasRef}
        className='fixed inset-0 h-[calc(100%-50px)] w-full bg-black/90'
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
