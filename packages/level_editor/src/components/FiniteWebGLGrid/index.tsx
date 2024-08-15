'use client'

import React, { useRef, useState, useCallback, useEffect } from 'react'
import {
  type Color,
  type GridDimensions,
  type GridState,
  type ProgramInfo,
  type ColoredCell,
} from './types'
import { initShaderProgram } from './utils'

const DEFAULT_BACKGROUND_COLOR: Color = { r: 0.01, g: 0.01, b: 0.01, a: 1 }
const DEFAULT_GRID_COLOR: Color = { r: 1, g: 1, b: 1, a: 1 }
const MAX_SCALE = 2
const MIN_SCALE = 0.1
const BASE_CELL_SIZE = 50
const DEFAULT_GRID_DIMENSIONS: GridDimensions = { width: 2000, height: 2000 }
const SWIPE_THRESHOLD = 10 // pixels

const COLOR_PALETTE: Color[] = [
  { r: 1, g: 0, b: 0, a: 1 },
  { r: 0, g: 1, b: 0, a: 1 },
  { r: 0, g: 0, b: 1, a: 1 },
  { r: 1, g: 1, b: 0, a: 1 },
  { r: 1, g: 0, b: 1, a: 1 },
  { r: 0, g: 1, b: 1, a: 1 },
]

interface FiniteWebGLGridProps {
  backgroundColor?: Color
  gridColor?: Color
}

const FiniteWebGLGrid: React.FC<FiniteWebGLGridProps> = ({
  backgroundColor = DEFAULT_BACKGROUND_COLOR,
  gridColor = DEFAULT_GRID_COLOR,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [gridState, setGridState] = useState<GridState>({ offsetX: 0, offsetY: 0, scale: 1 })
  const [gridDimensions, setGridDimensions] = useState<GridDimensions>(DEFAULT_GRID_DIMENSIONS)
  const [coloredCells, setColoredCells] = useState<ColoredCell[]>([])
  const [selectedColor, setSelectedColor] = useState<Color>(COLOR_PALETTE[0])
  const isDraggingRef = useRef<boolean>(false)
  const lastTouchPosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 })
  const touchStartPosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 })
  const glRef = useRef<WebGLRenderingContext | null>(null)
  const programInfoRef = useRef<ProgramInfo | null>(null)
  const positionBufferRef = useRef<WebGLBuffer | null>(null)

  const drawGrid = useCallback(() => {
    const gl = glRef.current
    const programInfo = programInfoRef.current
    if (!gl || !programInfo) return

    gl.clearColor(backgroundColor.r, backgroundColor.g, backgroundColor.b, backgroundColor.a)
    gl.clear(gl.COLOR_BUFFER_BIT)

    gl.useProgram(programInfo.program)

    const canvasWidth = gl.canvas.width
    const canvasHeight = gl.canvas.height

    gl.uniform2f(programInfo.uniformLocations.resolution, canvasWidth, canvasHeight)
    gl.uniform2f(programInfo.uniformLocations.offset, gridState.offsetX, gridState.offsetY)
    gl.uniform1f(programInfo.uniformLocations.scale, gridState.scale)

    const visibleWidth = canvasWidth / gridState.scale
    const visibleHeight = canvasHeight / gridState.scale

    const startX = Math.max(0, Math.floor(gridState.offsetX / BASE_CELL_SIZE) * BASE_CELL_SIZE)
    const startY = Math.max(0, Math.floor(gridState.offsetY / BASE_CELL_SIZE) * BASE_CELL_SIZE)
    const endX = Math.min(gridDimensions.width, startX + visibleWidth + BASE_CELL_SIZE)
    const endY = Math.min(gridDimensions.height, startY + visibleHeight + BASE_CELL_SIZE)

    // Draw colored cells
    coloredCells.forEach((cell) => {
      const x = cell.x * BASE_CELL_SIZE
      const y = cell.y * BASE_CELL_SIZE
      if (x >= startX && x < endX && y >= startY && y < endY) {
        gl.uniform4f(
          programInfo.uniformLocations.color,
          cell.color.r,
          cell.color.g,
          cell.color.b,
          cell.color.a,
        )
        const positions = [
          x,
          y,
          x + BASE_CELL_SIZE,
          y,
          x,
          y + BASE_CELL_SIZE,
          x + BASE_CELL_SIZE,
          y + BASE_CELL_SIZE,
        ]
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBufferRef.current)
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW)
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
      }
    })

    // Draw grid lines
    gl.uniform4f(
      programInfo.uniformLocations.color,
      gridColor.r,
      gridColor.g,
      gridColor.b,
      gridColor.a,
    )
    const positions: number[] = []

    for (let x = startX; x <= endX; x += BASE_CELL_SIZE) {
      positions.push(x, 0, x, gridDimensions.height)
    }

    for (let y = startY; y <= endY; y += BASE_CELL_SIZE) {
      positions.push(0, y, gridDimensions.width, y)
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, positionBufferRef.current)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW)

    gl.enableVertexAttribArray(programInfo.attribLocations.position)
    gl.vertexAttribPointer(programInfo.attribLocations.position, 2, gl.FLOAT, false, 0, 0)

    gl.drawArrays(gl.LINES, 0, positions.length / 2)
  }, [gridState, backgroundColor, gridColor, coloredCells, gridDimensions])

  const getMinScale = useCallback(
    (canvasWidth: number, canvasHeight: number): number => {
      const scaleX = canvasWidth / gridDimensions.width
      const scaleY = canvasHeight / gridDimensions.height
      return Math.max(scaleX, scaleY, MIN_SCALE)
    },
    [gridDimensions],
  )

  const getMaxOffset = useCallback(
    (
      scale: number,
      canvasWidth: number,
      canvasHeight: number,
    ): { maxOffsetX: number; maxOffsetY: number } => {
      const visibleWidth = canvasWidth / scale
      const visibleHeight = canvasHeight / scale

      const maxOffsetX = Math.max(0, gridDimensions.width - visibleWidth)
      const maxOffsetY = Math.max(0, gridDimensions.height - visibleHeight)

      return { maxOffsetX, maxOffsetY }
    },
    [gridDimensions],
  )

  const handleTouchStart = useCallback((e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault()
    const touch = e.touches[0]
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = touch.clientX - rect.left
    const y = touch.clientY - rect.top

    touchStartPosRef.current = { x, y }
    lastTouchPosRef.current = { x: touch.clientX, y: touch.clientY }
  }, [])

  const handleTouchMove = useCallback(
    (e: React.TouchEvent<HTMLCanvasElement>) => {
      e.preventDefault()
      const touch = e.touches[0]
      const canvas = canvasRef.current
      if (!canvas) return

      const rect = canvas.getBoundingClientRect()
      const x = touch.clientX - rect.left
      const y = touch.clientY - rect.top

      const dx = x - touchStartPosRef.current.x
      const dy = y - touchStartPosRef.current.y

      if (Math.abs(dx) > SWIPE_THRESHOLD || Math.abs(dy) > SWIPE_THRESHOLD) {
        isDraggingRef.current = true
      }

      if (isDraggingRef.current) {
        setGridState((prev) => {
          const newOffsetX = prev.offsetX - dx / prev.scale
          const newOffsetY = prev.offsetY - dy / prev.scale
          const { maxOffsetX, maxOffsetY } = getMaxOffset(prev.scale, canvas.width, canvas.height)
          return {
            ...prev,
            offsetX: Math.max(0, Math.min(maxOffsetX, newOffsetX)),
            offsetY: Math.max(0, Math.min(maxOffsetY, newOffsetY)),
          }
        })
        touchStartPosRef.current = { x, y }
      }
    },
    [getMaxOffset],
  )

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent<HTMLCanvasElement>) => {
      e.preventDefault()
      const canvas = canvasRef.current
      if (!canvas) return

      if (!isDraggingRef.current) {
        const x = touchStartPosRef.current.x
        const y = touchStartPosRef.current.y

        const worldX = gridState.offsetX + x / gridState.scale
        const worldY = gridState.offsetY + y / gridState.scale

        const cellX = Math.floor(worldX / BASE_CELL_SIZE)
        const cellY = Math.floor(worldY / BASE_CELL_SIZE)

        setColoredCells((prev) => {
          const existingCellIndex = prev.findIndex((cell) => cell.x === cellX && cell.y === cellY)
          if (existingCellIndex !== -1) {
            return prev.filter((_, index) => index !== existingCellIndex)
          } else {
            return [...prev, { x: cellX, y: cellY, color: selectedColor }]
          }
        })
      }

      isDraggingRef.current = false
    },
    [gridState, selectedColor],
  )

  const handlePinchZoom = useCallback(
    (e: TouchEvent) => {
      e.preventDefault()
      if (e.touches.length !== 2) return

      const touch1 = e.touches[0]
      const touch2 = e.touches[1]
      const dist = Math.hypot(touch1.clientX - touch2.clientX, touch1.clientY - touch2.clientY)

      const canvas = canvasRef.current
      if (!canvas) return

      const rect = canvas.getBoundingClientRect()
      const centerX = (touch1.clientX + touch2.clientX) / 2 - rect.left
      const centerY = (touch1.clientY + touch2.clientY) / 2 - rect.top

      setGridState((prev) => {
        const newScale = Math.max(
          getMinScale(canvas.width, canvas.height),
          Math.min(MAX_SCALE, prev.scale * (dist / (prev.lastPinchDist || dist))),
        )

        const worldCenterX = prev.offsetX + centerX / prev.scale
        const worldCenterY = prev.offsetY + centerY / prev.scale

        const newOffsetX = worldCenterX - centerX / newScale
        const newOffsetY = worldCenterY - centerY / newScale

        const { maxOffsetX, maxOffsetY } = getMaxOffset(newScale, canvas.width, canvas.height)

        return {
          offsetX: Math.max(0, Math.min(maxOffsetX, newOffsetX)),
          offsetY: Math.max(0, Math.min(maxOffsetY, newOffsetY)),
          scale: newScale,
          lastPinchDist: dist,
        }
      })
    },
    [getMaxOffset, getMinScale],
  )

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) {
      console.error('Canvas not found')
      return
    }

    const gl = canvas.getContext('webgl')
    if (!gl) {
      console.error('WebGL not supported')
      return
    }
    glRef.current = gl

    const shaderProgram = initShaderProgram(gl)
    if (!shaderProgram) return

    programInfoRef.current = {
      program: shaderProgram,
      attribLocations: {
        position: gl.getAttribLocation(shaderProgram, 'aPosition'),
      },
      uniformLocations: {
        resolution: gl.getUniformLocation(shaderProgram, 'uResolution'),
        offset: gl.getUniformLocation(shaderProgram, 'uOffset'),
        scale: gl.getUniformLocation(shaderProgram, 'uScale'),
        color: gl.getUniformLocation(shaderProgram, 'uColor'),
      },
    }

    positionBufferRef.current = gl.createBuffer()

    canvas.addEventListener('touchmove', handlePinchZoom)

    const resizeCanvas = () => {
      const displayWidth = canvas.clientWidth
      const displayHeight = canvas.clientHeight

      if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
        canvas.width = displayWidth
        canvas.height = displayHeight
        gl.viewport(0, 0, canvas.width, canvas.height)

        setGridState((prev) => {
          const minScale = getMinScale(canvas.width, canvas.height)
          const newScale = Math.max(minScale, prev.scale)
          const { maxOffsetX, maxOffsetY } = getMaxOffset(newScale, canvas.width, canvas.height)
          return {
            offsetX: Math.min(prev.offsetX, maxOffsetX),
            offsetY: Math.min(prev.offsetY, maxOffsetY),
            scale: newScale,
          }
        })
      }
    }

    window.addEventListener('resize', resizeCanvas)
    resizeCanvas()

    function animate() {
      resizeCanvas()
      drawGrid()
      requestAnimationFrame(animate)
    }
    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      canvas.removeEventListener('touchmove', handlePinchZoom)
    }
  }, [drawGrid, getMaxOffset, getMinScale, handlePinchZoom])

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
      />
      {/* <div className='absolute bottom-4 left-4 rounded bg-white p-2 text-black shadow'>
        <p>Scale: {gridState.scale.toFixed(2)}</p>
        <p>Offset X: {gridState.offsetX.toFixed(2)}</p>
        <p>Offset Y: {gridState.offsetY.toFixed(2)}</p>
        <p>Cell Size: {(BASE_CELL_SIZE * gridState.scale).toFixed(2)}</p>
        <p>Colored Cells: {coloredCells.length}</p>
        <p>
          Grid Size: {gridDimensions.width} x {gridDimensions.height}
        </p>
      </div> */}
    </div>
  )
}

export default FiniteWebGLGrid
