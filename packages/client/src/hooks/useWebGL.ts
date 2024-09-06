import { useCallback, useEffect, useRef } from 'react'

import {
  createProgramInfo,
  createBufferInfoFromArrays,
  setBuffersAndAttributes,
  setUniforms,
  drawBufferInfo,
  resizeCanvasToDisplaySize,
  type ProgramInfo,
} from 'twgl.js'
import {
  BASE_CELL_SIZE,
  BASE_LINE_WIDTH,
  BUFFER_RATIO,
  DEFAULT_GRID_COLOR,
  MIN_SCALE,
} from '@/constants/webgl'
import gridFsSource from '@/libs/webgl/shaders/grid.fs'
import gridVsSource from '@/libs/webgl/shaders/grid.vs'
import pixelFsSource from '@/libs/webgl/shaders/pixel.fs'
import pixelVsSource from '@/libs/webgl/shaders/pixel.vs'

import { type Pixel, type GridState } from '@/types'
import { getVisibleArea } from '@/utils/canvas'

export const useWebGL = (
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  gridState: GridState,
) => {
  const glRef = useRef<WebGLRenderingContext | null>(null)
  const gridProgramInfoRef = useRef<ProgramInfo | null>(null)
  const pixelProgramInfoRef = useRef<ProgramInfo | null>(null)

  const initWebGL = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const gl = canvas.getContext('webgl2')
    if (!gl) {
      console.error('WebGL not supported')
      return
    }

    glRef.current = gl
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)
    resizeCanvasToDisplaySize(canvas)
    gridProgramInfoRef.current = createProgramInfo(gl, [gridVsSource, gridFsSource])
    pixelProgramInfoRef.current = createProgramInfo(gl, [pixelVsSource, pixelFsSource])
  }, [canvasRef])

  useEffect(() => {
    initWebGL()
  }, [initWebGL])

  const drawGrid = useCallback(() => {
    const gl = glRef.current
    if (!gl) {
      console.error('WebGL not supported')
      return
    }

    gl.clearColor(0, 0, 0, 0.8)
    gl.clear(gl.COLOR_BUFFER_BIT)

    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)
    resizeCanvasToDisplaySize(gl.canvas as HTMLCanvasElement)

    const gridProgramInfo = gridProgramInfoRef.current
    if (!gridProgramInfo) {
      console.error('ProgramInfo not initialized')
      return
    }

    const { startX, startY, endX, endY } = getVisibleArea(gl.canvas as HTMLCanvasElement, gridState)
    const darker = gridState.scale > MIN_SCALE * BUFFER_RATIO ? 1.0 : 0.5

    // グリッドの描画
    const gridPositions: number[] = []
    for (let x = startX; x <= endX; x += BASE_CELL_SIZE) {
      gridPositions.push(x, startY, x, endY)
    }
    for (let y = startY; y <= endY; y += BASE_CELL_SIZE) {
      gridPositions.push(startX, y, endX, y)
    }

    const gridUniforms = {
      uResolution: [gl.canvas.width, gl.canvas.height],
      uOffset: [gridState.offsetX, gridState.offsetY],
      uScale: gridState.scale,
      uLineWidth: BASE_LINE_WIDTH * gridState.scale,
      uColor: [
        DEFAULT_GRID_COLOR.r * darker,
        DEFAULT_GRID_COLOR.g * darker,
        DEFAULT_GRID_COLOR.b * darker,
        DEFAULT_GRID_COLOR.a,
      ],
    }

    const gridBufferInfo = createBufferInfoFromArrays(gl, {
      aPosition: { numComponents: 2, data: gridPositions },
    })

    gl.useProgram(gridProgramInfo.program)
    setBuffersAndAttributes(gl, gridProgramInfo, gridBufferInfo)
    setUniforms(gridProgramInfo, gridUniforms)
    drawBufferInfo(gl, gridBufferInfo, gl.LINES, gridPositions.length / 2)
  }, [gridState])

  const drawPixels = useCallback(
    (pixels: Pixel[]) => {
      const gl = glRef.current
      if (!gl) {
        console.error('WebGL not supported')
        return
      }

      gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)
      resizeCanvasToDisplaySize(gl.canvas as HTMLCanvasElement)

      const pixelProgramInfo = pixelProgramInfoRef.current
      if (!pixelProgramInfo) {
        console.error('ProgramInfo not initialized')
        return
      }

      // ピクセルの描画
      const pixelPositions: number[] = []
      const pixelColors: number[] = []

      const pixelSize = BASE_CELL_SIZE * 0.98 // Reduce the size slightly to leave space for grid lines
      const offset = (BASE_CELL_SIZE - pixelSize) / 2 // Center the smaller pixel within the grid cell

      pixels.forEach((pixel) => {
        const x = pixel.x * BASE_CELL_SIZE + offset
        const y = pixel.y * BASE_CELL_SIZE + offset

        // Define two triangles for each rectangle (tile)
        const positions = [
          x,
          y,
          x + pixelSize,
          y,
          x,
          y + pixelSize,
          x,
          y + pixelSize,
          x + pixelSize,
          y,
          x + pixelSize,
          y + pixelSize,
        ]
        pixelPositions.push(...positions)
        for (let i = 0; i < 6; i++) {
          pixelColors.push(pixel.color.r, pixel.color.g, pixel.color.b, pixel.color.a)
        }
      })

      const pixelBufferInfo = createBufferInfoFromArrays(gl, {
        aPosition: { numComponents: 2, data: pixelPositions },
        aColor: { numComponents: 4, data: pixelColors },
      })

      const pixelUniforms = {
        uResolution: [gl.canvas.width, gl.canvas.height],
        uOffset: [gridState.offsetX, gridState.offsetY],
        uScale: gridState.scale,
      }

      gl.useProgram(pixelProgramInfo.program)
      setBuffersAndAttributes(gl, pixelProgramInfo, pixelBufferInfo)
      setUniforms(pixelProgramInfo, pixelUniforms)
      drawBufferInfo(gl, pixelBufferInfo, gl.TRIANGLES, pixelPositions.length / 2)

      const error = gl.getError()
      if (error) {
        console.error('WebGL error', error)
      }
    },
    [gridState],
  )

  return { glRef, drawGrid, drawPixels }
}
