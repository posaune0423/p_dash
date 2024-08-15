'use client'

import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'
import { COLOR_PALETTE, DEFAULT_BACKGROUND_COLOR, DEFAULT_GRID_COLOR } from './const'
import { useStageEditor } from './hooks'
import { type Color } from './types'

interface StageEditorProps {
  backgroundColor?: Color
  gridColor?: Color
}

const StageEditor: React.FC<StageEditorProps> = ({
  backgroundColor = DEFAULT_BACKGROUND_COLOR,
  gridColor = DEFAULT_GRID_COLOR,
}) => {
  const {
    canvasRef,
    selectedColor,
    setSelectedColor,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleWheel,
  } = useStageEditor(backgroundColor, gridColor)

  return (
    <div className='relative h-screen w-full'>
      <canvas
        ref={canvasRef}
        className='fixed inset-x-0 bottom-[50px] top-0'
        style={{ width: '100%', height: 'calc(100% - 50px)' }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onWheel={handleWheel}
      />
      <div className='fixed inset-x-0 bottom-0 flex h-[50px] items-center justify-center space-x-2 bg-white shadow-md'>
        <div className='flex items-center justify-center space-x-2'>
          <Button>
            <Link href='/'>Back</Link>
          </Button>
          {COLOR_PALETTE.map((color, index) => (
            <button
              key={index}
              className={`size-8 rounded-full ${selectedColor === color ? 'ring-2 ring-black ring-offset-2' : ''}`}
              style={{
                backgroundColor: `rgba(${color.r * 255}, ${color.g * 255}, ${color.b * 255}, ${color.a})`,
              }}
              onClick={() => setSelectedColor(color)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export { StageEditor }
