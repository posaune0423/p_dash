'use client'

import React from 'react'
import { COLOR_PALETTE, DEFAULT_BACKGROUND_COLOR, DEFAULT_GRID_COLOR } from './const'
import { useGridBoard } from './hooks'
import { type Color } from './types'

interface GridBoardProps {
  backgroundColor?: Color
  gridColor?: Color
}

const GridBoard: React.FC<GridBoardProps> = ({
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
  } = useGridBoard(backgroundColor, gridColor)

  return (
    <div className='flex h-screen w-full flex-col items-center justify-center bg-gray-100'>
      <div className='flex h-[50px] space-x-2 py-2'>
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
      <canvas
        ref={canvasRef}
        style={{ width: '100%', height: 'calc(100% - 50px)' }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onWheel={handleWheel}
      />
    </div>
  )
}

export { GridBoard }
