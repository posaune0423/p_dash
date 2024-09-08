import { useCallback, useEffect, useRef } from 'react'
import {
  createBufferInfoFromArrays,
  createProgramInfo,
  createTexture,
  drawBufferInfo,
  type ProgramInfo,
  resizeCanvasToDisplaySize,
  setBuffersAndAttributes,
  setUniforms,
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
import { type GridState, type Block } from '@/types'
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

    // Enable alpha blending
    gl.enable(gl.BLEND)
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)
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

  const drawBlocks = useCallback(
    (blocks: Block[]) => {
      const gl = glRef.current
      const pixelProgramInfo = pixelProgramInfoRef.current
      if (!gl || !pixelProgramInfo) return

      resizeCanvasToDisplaySize(gl.canvas as HTMLCanvasElement)
      gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)

      blocks.forEach((block) => {
        const texture = createTexture(
          gl,
          {
            src: block.image,
            min: gl.LINEAR_MIPMAP_LINEAR,
            mag: gl.LINEAR,
            wrap: gl.CLAMP_TO_EDGE,
          },
          (err, tex) => {
            if (err) {
              console.error('Failed to load texture', err)
            } else {
              gl.bindTexture(gl.TEXTURE_2D, tex)
              gl.generateMipmap(gl.TEXTURE_2D)
            }
          },
        )

        const x = block.x * BASE_CELL_SIZE
        const y = block.y * BASE_CELL_SIZE
        const width = BASE_CELL_SIZE
        const height = BASE_CELL_SIZE

        const arrays = {
          aPosition: {
            numComponents: 2,
            data: [x, y, x + width, y, x, y + height, x + width, y + height],
          },
          aTextCoord: { numComponents: 2, data: [0, 0, 1, 0, 0, 1, 1, 1] },
        }

        const bufferInfo = createBufferInfoFromArrays(gl, arrays)

        const uniforms = {
          uResolution: [gl.canvas.width, gl.canvas.height],
          uOffset: [gridState.offsetX, gridState.offsetY],
          uScale: gridState.scale,
          uTexture: texture,
        }

        gl.useProgram(pixelProgramInfo.program)
        setBuffersAndAttributes(gl, pixelProgramInfo, bufferInfo)
        setUniforms(pixelProgramInfo, uniforms)
        drawBufferInfo(gl, bufferInfo, gl.TRIANGLE_STRIP)
      })
    },
    [gridState],
  )

  return { glRef, drawGrid, drawBlocks }
}
