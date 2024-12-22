

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
    <main className='fixed inset-0' style={{ overflow: 'hidden' }}>
      <canvas
        ref={canvasRef}
        className='fixed inset-0 size-full max-h-[calc(100%-50px)] touch-none bg-black/90'
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
    </main>
  )
}
