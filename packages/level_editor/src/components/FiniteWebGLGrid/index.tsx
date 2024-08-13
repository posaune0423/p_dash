'use client'

import React, { useRef, useState, useCallback, useEffect } from 'react'
import { Color, GridDimensions, GridState, ProgramInfo } from './types'
import { initShaderProgram } from './utils'

const DEFAULT_BACKGROUND_COLOR: Color = { r: 0.01, g: 0.01, b: 0.01, a: 1 }
const DEFAULT_GRID_COLOR: Color = { r: 1, g: 1, b: 1, a: 1 }
const MIN_SCALE = 0.5
const MAX_SCALE = 2
const BASE_CELL_SIZE = 50
const GRID_DIMENSIONS: GridDimensions = { width: 2000, height: 2000 }

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
  const isDraggingRef = useRef<boolean>(false)
  const lastMousePosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 })
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
    gl.uniform4f(
      programInfo.uniformLocations.color,
      gridColor.r,
      gridColor.g,
      gridColor.b,
      gridColor.a,
    )

    const cellSize = BASE_CELL_SIZE * gridState.scale
    const visibleWidth = canvasWidth / gridState.scale
    const visibleHeight = canvasHeight / gridState.scale

    const startX = Math.max(0, Math.floor(gridState.offsetX / cellSize) * cellSize)
    const startY = Math.max(0, Math.floor(gridState.offsetY / cellSize) * cellSize)
    const endX = Math.min(GRID_DIMENSIONS.width, startX + visibleWidth + cellSize)
    const endY = Math.min(GRID_DIMENSIONS.height, startY + visibleHeight + cellSize)

    const positions: number[] = []

    for (let x = startX; x <= endX; x += cellSize) {
      positions.push(x, 0, x, GRID_DIMENSIONS.height)
    }

    for (let y = startY; y <= endY; y += cellSize) {
      positions.push(0, y, GRID_DIMENSIONS.width, y)
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, positionBufferRef.current)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW)

    gl.enableVertexAttribArray(programInfo.attribLocations.position)
    gl.vertexAttribPointer(programInfo.attribLocations.position, 2, gl.FLOAT, false, 0, 0)

    gl.drawArrays(gl.LINES, 0, positions.length / 2)
  }, [gridState, backgroundColor, gridColor])

  const getMinScale = useCallback((canvasWidth: number, canvasHeight: number): number => {
    const scaleX = canvasWidth / GRID_DIMENSIONS.width
    const scaleY = canvasHeight / GRID_DIMENSIONS.height
    return Math.max(scaleX, scaleY)
  }, [])

  const getMaxOffset = useCallback(
    (
      scale: number,
      canvasWidth: number,
      canvasHeight: number,
    ): { maxOffsetX: number; maxOffsetY: number } => {
      const visibleWidth = canvasWidth / scale
      const visibleHeight = canvasHeight / scale

      const maxOffsetX = Math.max(0, GRID_DIMENSIONS.width - visibleWidth)
      const maxOffsetY = Math.max(0, GRID_DIMENSIONS.height - visibleHeight)

      return { maxOffsetX, maxOffsetY }
    },
    [],
  )

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const gl = canvas.getContext('webgl')
    if (!gl) {
      console.error('WebGL not supported')
      return
    }
    glRef.current = gl

    const vsSource = `
      attribute vec2 aPosition;
      uniform vec2 uResolution;
      uniform vec2 uOffset;
      uniform float uScale;
      void main() {
        vec2 scaledPosition = (aPosition - uOffset) * uScale;
        vec2 clipSpace = (scaledPosition / uResolution) * 2.0 - 1.0;
        gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);
      }
    `

    const fsSource = `
      precision mediump float;
      uniform vec4 uColor;
      void main() {
        gl_FragColor = uColor;
      }
    `

    const shaderProgram = initShaderProgram(gl, vsSource, fsSource)
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

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()
      const scaleFactor = e.deltaY > 0 ? 0.9 : 1.1
      setGridState((prev) => {
        const minScale = getMinScale(canvas.width, canvas.height)
        const newScale = Math.max(minScale, Math.min(MAX_SCALE, prev.scale * scaleFactor))
        const mouseX = e.clientX - canvas.width / 2
        const mouseY = e.clientY - canvas.height / 2
        const newOffsetX = prev.offsetX + (mouseX / prev.scale - mouseX / newScale)
        const newOffsetY = prev.offsetY + (mouseY / prev.scale - mouseY / newScale)
        const { maxOffsetX, maxOffsetY } = getMaxOffset(newScale, canvas.width, canvas.height)
        return {
          offsetX: Math.max(0, Math.min(maxOffsetX, newOffsetX)),
          offsetY: Math.max(0, Math.min(maxOffsetY, newOffsetY)),
          scale: newScale,
        }
      })
    }

    const handleMouseDown = (e: MouseEvent) => {
      isDraggingRef.current = true
      lastMousePosRef.current = { x: e.clientX, y: e.clientY }
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (isDraggingRef.current) {
        const dx = e.clientX - lastMousePosRef.current.x
        const dy = e.clientY - lastMousePosRef.current.y
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
        lastMousePosRef.current = { x: e.clientX, y: e.clientY }
      }
    }

    const handleMouseUp = () => {
      isDraggingRef.current = false
    }

    canvas.addEventListener('wheel', handleWheel)
    canvas.addEventListener('mousedown', handleMouseDown)
    canvas.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('mouseup', handleMouseUp)
    canvas.addEventListener('mouseleave', handleMouseUp)

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
      canvas.removeEventListener('wheel', handleWheel)
      canvas.removeEventListener('mousedown', handleMouseDown)
      canvas.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('mouseup', handleMouseUp)
      canvas.removeEventListener('mouseleave', handleMouseUp)
    }
  }, [drawGrid, getMaxOffset, getMinScale])

  return (
    <div className='w-full h-screen bg-gray-100 flex items-center justify-center'>
      <canvas
        ref={canvasRef}
        className='border border-gray-300 shadow-lg'
        style={{ width: '100%', height: '100%' }}
      />
      <div className='absolute bottom-4 left-4 bg-white p-2 rounded shadow text-black'>
        <p>Scale: {gridState.scale.toFixed(2)}</p>
        <p>Offset X: {gridState.offsetX.toFixed(2)}</p>
        <p>Offset Y: {gridState.offsetY.toFixed(2)}</p>
        <p>Cell Size: {(BASE_CELL_SIZE * gridState.scale).toFixed(2)}</p>
      </div>
    </div>
  )
}

export default FiniteWebGLGrid
