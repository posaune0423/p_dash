import React from 'react'
import { COLOR_PALETTE, DEFAULT_BACKGROUND_COLOR, DEFAULT_GRID_COLOR } from './const'
import { usePixelViewer } from './hooks'
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
  } = usePixelViewer(backgroundColor, gridColor)

  return (
    <div className='relative size-full'>
      <canvas
        ref={canvasRef}
        className='bottom fixed inset-x-0 top-[50px]'
        style={{ width: '100%', height: 'calc(100% - 50px)' }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onWheel={handleWheel}
      />
      <div className='bg-primary fixed inset-x-0 bottom-1 mx-auto flex h-[50px] max-w-fit items-center justify-center space-x-8 rounded-md px-4 shadow-md'>
        <div className='flex items-center space-x-2'>
          {COLOR_PALETTE.map((color, index) => (
            <button
              key={index}
              className={`size-8 rounded-full ${
                selectedColor === color ? 'ring-2 ring-black ring-offset-2' : ''
              }`}
              style={{
                backgroundColor: `rgba(${color.r * 255}, ${color.g * 255}, ${color.b * 255}, ${
                  color.a
                })`,
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
