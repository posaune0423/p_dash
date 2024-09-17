'use client'

import { useEntityQuery, useQuerySync } from '@dojoengine/react'
import { getComponentValue, HasValue } from '@dojoengine/recs'
import { startTransition, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { BASE_CELL_SIZE, MAX_SCALE, MIN_SCALE, SWIPE_THRESHOLD } from '@/constants/canvas'
import { useDojo } from '@/hooks/useDojo'
import { useGridState } from '@/hooks/useGridState'
import { type GridState, type Block, BlockType } from '@/types'
import { convertClientPosToCanvasPos } from '@/utils/canvas'
import { getPinchDistance, getTouchPositions } from '@/utils/gestures'

const GRID_WIDTH = 80
const GRID_HEIGHT = 10

const blockTypeToImage = {
  [BlockType.Block]: 'block.png',
  [BlockType.Spike]: 'spike.png',
  [BlockType.Tile]: 'tiles.png',
}

export const useStageEditor = ({ stageId }: { stageId: number }) => {
  // Refs
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null)
  const imageCache = useRef<Map<string, HTMLImageElement>>(new Map())
  const isDraggingRef = useRef<boolean>(false)
  const lastTouchPosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 })
  const touchStartPosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 })
  const gestureRef = useRef({
    lastPinchDistance: null as number | null,
    lastTouchPositions: null as { x: number; y: number }[] | null,
    isGesture: false,
    gestureType: null as string | null,
    gestureStartTime: null as number | null,
  })

  const [selectedElement, setSelectedElement] = useState<BlockType | null>(null)
  const handleSelectElement = (element: BlockType) => {
    setSelectedElement(element)
  }

  // Other Hooks
  const {
    setup: {
      toriiClient,
      clientComponents: { Block },
      contractComponents,
    },
  } = useDojo()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useQuerySync(toriiClient, [contractComponents.Block], [])

  const blockEntities = useEntityQuery([HasValue(Block, { stage_id: stageId })])
  const blocks = useMemo(() => {
    return blockEntities
      .map((entity) => {
        const block = getComponentValue(Block, entity)
        return {
          x: block?.x,
          y: block?.y,
          type: block?.blocktype as unknown as BlockType,
          image: `/assets/stage/sci-fi/${blockTypeToImage[block?.blocktype as unknown as BlockType]}`,
        } as Block
      })
      .filter((block) => block.type !== BlockType.Empty && block.type !== BlockType.InitBlock)
  }, [blockEntities, Block])

  const { gridState, setGridState } = useGridState()
  const [currentBlocks, setCurrentBlocks] = useState<Block[]>(blocks)

  const loadImage = useCallback((src: string): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
      if (imageCache.current.has(src)) {
        resolve(imageCache.current.get(src)!)
      } else {
        const img = new Image()
        img.onload = () => {
          imageCache.current.set(src, img)
          resolve(img)
        }
        img.onerror = reject
        img.src = src
      }
    })
  }, [])

  const drawGrid = useCallback(() => {
    const ctx = ctxRef.current
    const canvas = canvasRef.current
    if (!ctx || !canvas) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    const startX = Math.floor(gridState.offsetX / BASE_CELL_SIZE)
    const startY = Math.floor(gridState.offsetY / BASE_CELL_SIZE)
    const endX = Math.ceil((gridState.offsetX + canvas.width / gridState.scale) / BASE_CELL_SIZE)
    const endY = Math.ceil((gridState.offsetY + canvas.height / gridState.scale) / BASE_CELL_SIZE)

    ctx.beginPath()
    ctx.strokeStyle = 'rgba(200, 200, 200, 0.5)'
    ctx.lineWidth = 1 / gridState.scale

    for (let x = startX; x <= endX; x++) {
      const screenX = (x * BASE_CELL_SIZE - gridState.offsetX) * gridState.scale
      ctx.moveTo(screenX, 0)
      ctx.lineTo(screenX, canvas.height)
    }

    for (let y = startY; y <= endY; y++) {
      const screenY = (y * BASE_CELL_SIZE - gridState.offsetY) * gridState.scale
      ctx.moveTo(0, screenY)
      ctx.lineTo(canvas.width, screenY)
    }

    ctx.stroke()
  }, [gridState])

  const setLimitedGridState = useCallback(
    (updater: (prev: GridState) => GridState) => {
      setGridState((prev) => {
        const newState = updater(prev)
        const maxOffsetX = Math.max(
          0,
          GRID_WIDTH * BASE_CELL_SIZE - (canvasRef.current?.width || 0) / newState.scale,
        )
        const maxOffsetY = Math.max(
          0,
          GRID_HEIGHT * BASE_CELL_SIZE - (canvasRef.current?.height || 0) / newState.scale,
        )
        return {
          ...newState,
          offsetX: Math.min(Math.max(0, newState.offsetX), maxOffsetX),
          offsetY: Math.min(Math.max(0, newState.offsetY), maxOffsetY),
        }
      })
    },
    [setGridState],
  )

  const handleTouchStart = useCallback((e: React.TouchEvent<HTMLCanvasElement>) => {
    if (e.touches.length === 2) {
      gestureRef.current.isGesture = true
      gestureRef.current.gestureStartTime = performance.now()
      gestureRef.current.lastPinchDistance = getPinchDistance(e.touches)
      gestureRef.current.lastTouchPositions = getTouchPositions(e.touches)
      gestureRef.current.gestureType = null
    } else {
      isDraggingRef.current = false
      const touch = e.touches[0]
      const canvas = canvasRef.current
      if (!canvas) return

      const rect = canvas.getBoundingClientRect()
      const x = touch.clientX - rect.left
      const y = touch.clientY - rect.top
      touchStartPosRef.current = { x, y }
      lastTouchPosRef.current = { x: touch.clientX, y: touch.clientY }

      // Add a timestamp for the touch start
      gestureRef.current.gestureStartTime = performance.now()
    }
  }, [])

  const handleTouchMove = useCallback(
    (e: React.TouchEvent<HTMLCanvasElement>) => {
      if (e.touches.length === 2 && gestureRef.current.isGesture) {
        const currentDistance = getPinchDistance(e.touches)
        const currentPositions = getTouchPositions(e.touches)
        const pinchDelta = currentDistance - (gestureRef.current.lastPinchDistance || 0)
        const moveDelta = {
          x:
            (currentPositions[0].x + currentPositions[1].x) / 2 -
            ((gestureRef.current.lastTouchPositions?.[0].x || 0) +
              (gestureRef.current.lastTouchPositions?.[1].x || 0)) /
              2,
          y:
            (currentPositions[0].y + currentPositions[1].y) / 2 -
            ((gestureRef.current.lastTouchPositions?.[0].y || 0) +
              (gestureRef.current.lastTouchPositions?.[1].y || 0)) /
              2,
        }

        if (!gestureRef.current.gestureType) {
          if (
            Math.abs(pinchDelta) > Math.abs(moveDelta.x) &&
            Math.abs(pinchDelta) > Math.abs(moveDelta.y)
          ) {
            gestureRef.current.gestureType = 'pinch'
          } else {
            gestureRef.current.gestureType = 'swipe'
          }
        }

        if (gestureRef.current.gestureType === 'pinch') {
          setLimitedGridState((prev) => {
            const zoomFactor =
              currentDistance / (gestureRef.current.lastPinchDistance || currentDistance)
            const newScale = Math.max(MIN_SCALE, Math.min(MAX_SCALE, prev.scale * zoomFactor))
            return { ...prev, scale: newScale }
          })
        } else {
          setLimitedGridState((prev) => ({
            ...prev,
            offsetX: Math.max(0, prev.offsetX - moveDelta.x / prev.scale),
            offsetY: Math.max(0, prev.offsetY - moveDelta.y / prev.scale),
          }))
        }

        gestureRef.current.lastPinchDistance = currentDistance
        gestureRef.current.lastTouchPositions = currentPositions
      } else if (e.touches.length === 1) {
        const touch = e.touches[0]
        const { x, y } = convertClientPosToCanvasPos(canvasRef, touch.clientX, touch.clientY)

        const dx = x - touchStartPosRef.current.x
        const dy = y - touchStartPosRef.current.y

        if (
          !isDraggingRef.current &&
          (Math.abs(dx) > SWIPE_THRESHOLD || Math.abs(dy) > SWIPE_THRESHOLD)
        ) {
          isDraggingRef.current = true
        }

        if (isDraggingRef.current) {
          setLimitedGridState((prev) => ({
            ...prev,
            offsetX: Math.max(0, prev.offsetX - dx / prev.scale),
            offsetY: Math.max(0, prev.offsetY - dy / prev.scale),
          }))
          touchStartPosRef.current = { x, y }
        }
      }
    },
    [setLimitedGridState],
  )

  const handleTouchEnd = useCallback(
    async (e: React.TouchEvent<HTMLCanvasElement>) => {
      e.preventDefault()
      gestureRef.current.isGesture = false
      gestureRef.current.gestureType = null

      if (!isDraggingRef.current && selectedElement) {
        const canvas = canvasRef.current
        if (!canvas) return

        const touch = e.changedTouches[0]

        const { x, y } = convertClientPosToCanvasPos(canvasRef, touch.clientX, touch.clientY)

        const worldX = gridState.offsetX + x / gridState.scale
        const worldY = gridState.offsetY + y / gridState.scale

        const cellX = Math.floor(worldX / BASE_CELL_SIZE)
        const cellY = Math.floor(worldY / BASE_CELL_SIZE)

        const block = {
          x: cellX,
          y: cellY,
          type: selectedElement,
          image: `/assets/stage/sci-fi/${blockTypeToImage[selectedElement]}`,
        } as Block

        startTransition(async () => {
          const shouldRemoveIndex = currentBlocks.findIndex(
            (b) => b.x === block.x && b.y === block.y && b.type === block.type,
          )

          if (shouldRemoveIndex !== -1) {
            setCurrentBlocks((prev) => prev.filter((_, index) => index !== shouldRemoveIndex))
          } else {
            setCurrentBlocks((prev) => [...prev, block])
          }

          await loadImage(block.image)
        })
      }

      isDraggingRef.current = false
    },
    [gridState, selectedElement, currentBlocks, loadImage, setCurrentBlocks],
  )

  // Effects
  useEffect(() => {
    const canvas = canvasRef.current
    if (canvas) {
      ctxRef.current = canvas.getContext('2d')
    }
  }, [])

  const drawBlock = useCallback(
    async (block: Block) => {
      const ctx = ctxRef.current
      const canvas = canvasRef.current
      if (!ctx || !canvas) return

      const screenX = (block.x * BASE_CELL_SIZE - gridState.offsetX) * gridState.scale
      const screenY = (block.y * BASE_CELL_SIZE - gridState.offsetY) * gridState.scale
      const size = BASE_CELL_SIZE * gridState.scale

      const image = await loadImage(block.image)
      ctx.drawImage(image, screenX, screenY, size, size)
    },
    [gridState, loadImage],
  )

  const animate = useCallback(async () => {
    const ctx = ctxRef.current
    const canvas = canvasRef.current
    if (!ctx || !canvas) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    drawGrid()
    for (let i = 0; i < currentBlocks.length; i++) {
      await drawBlock(currentBlocks[i])
    }
  }, [drawGrid, drawBlock, currentBlocks])

  useEffect(() => {
    const animateFrame = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animateFrame)
    }
  }, [animate, gridState])

  // resize observer
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const resizeObserver = new ResizeObserver(() => {
      canvas.width = canvas.clientWidth
      canvas.height = canvas.clientHeight
      animate()
    })

    resizeObserver.observe(canvas)

    return () => {
      resizeObserver.disconnect()
    }
  }, [animate])

  return {
    canvasRef,
    selectedElement,
    currentBlocks,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    handleSelectElement,
  }
}
