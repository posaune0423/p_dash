'use client'

import {
  startTransition,
  useCallback,
  useEffect,
  useMemo,
  useOptimistic,
  useRef,
  useState,
} from 'react'
import {
  BASE_CELL_SIZE,
  COLOR_PALETTE,
  INERTIA_DAMPING,
  INERTIA_STOP_THRESHOLD,
  MAX_SCALE,
  MIN_SCALE,
  SWIPE_THRESHOLD,
} from '@/constants/webgl'
import { useDojo } from '@/hooks/useDojo'
import { useGridState } from '@/hooks/useGridState'
import { useWebGL } from '@/hooks/useWebGL'
import { type Pixel, type Color } from '@/types'
import { rgbaToHex } from '@/utils'
import { convertClientPosToCanvasPos } from '@/utils/canvas'
import { getPinchDistance, getTouchPositions } from '@/utils/gestures'

export const usePixelViewer = () => {
  // Refs
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const mouseDownPosRef = useRef<{ x: number; y: number } | null>(null)
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
  const inertiaRef = useRef<{
    speedX: number
    speedY: number
    lastTime: number
    animationFrame: number | null
  }>({
    speedX: 0,
    speedY: 0,
    lastTime: 0,
    animationFrame: null,
  })

  // States
  const [currentMousePos, setCurrentMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 })
  const [selectedColor, setSelectedColor] = useState<Color>(COLOR_PALETTE[0])

  //Other Hooks
  const {
    setup: {
      systemCalls: { interact },
      account: { account },
      connectedAccount,
    },
  } = useDojo()
  const { gridState, setGridState } = useGridState()
  const { glRef, drawGrid, drawPixels } = useWebGL(canvasRef, gridState)
  const activeAccount = useMemo(() => connectedAccount || account, [connectedAccount, account])

  const [optimisticPixels, setOptimisticPixels] = useOptimistic(
    [
      {
        x: 0,
        y: 0,
        color: COLOR_PALETTE[0],
      },
    ],
    (pixels, newPixel: Pixel) => {
      return [...pixels, newPixel]
    },
  )

  // Handlers
  const updateCurrentMousePos = useCallback(
    (canvasX: number, canvasY: number) => {
      const worldX = gridState.offsetX + canvasX / gridState.scale
      const worldY = gridState.offsetY + canvasY / gridState.scale

      const cellX = Math.floor(worldX / BASE_CELL_SIZE)
      const cellY = Math.floor(worldY / BASE_CELL_SIZE)

      setCurrentMousePos({ x: cellX, y: cellY })
    },
    [gridState],
  )

  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    e.preventDefault()

    const { x, y } = convertClientPosToCanvasPos(canvasRef, e.clientX, e.clientY)

    mouseDownPosRef.current = { x, y }
    isDraggingRef.current = false
  }, [])

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      e.preventDefault()
      const { x, y } = convertClientPosToCanvasPos(canvasRef, e.clientX, e.clientY)

      startTransition(() => {
        updateCurrentMousePos(x, y)
      })

      if (!mouseDownPosRef.current) return

      const dx = x - mouseDownPosRef.current.x
      const dy = y - mouseDownPosRef.current.y

      if (
        !isDraggingRef.current &&
        (Math.abs(dx) > SWIPE_THRESHOLD / 2 || Math.abs(dy) > SWIPE_THRESHOLD / 2)
      ) {
        isDraggingRef.current = true
      }

      if (isDraggingRef.current) {
        setGridState((prev) => ({
          ...prev,
          offsetX: Math.max(0, prev.offsetX - dx / prev.scale),
          offsetY: Math.max(0, prev.offsetY - dy / prev.scale),
        }))

        mouseDownPosRef.current = { x, y }
      }
    },
    [updateCurrentMousePos, setGridState],
  )

  const handleMouseUp = useCallback(
    async (e: React.MouseEvent<HTMLCanvasElement>) => {
      e.preventDefault()

      if (!isDraggingRef.current && mouseDownPosRef.current) {
        const { x, y } = convertClientPosToCanvasPos(canvasRef, e.clientX, e.clientY)

        const worldX = gridState.offsetX + x / gridState.scale
        const worldY = gridState.offsetY + y / gridState.scale

        const cellX = Math.floor(worldX / BASE_CELL_SIZE)
        const cellY = Math.floor(worldY / BASE_CELL_SIZE)

        startTransition(async () => {
          setOptimisticPixels({ x: cellX, y: cellY, color: selectedColor })
          // play();
          await interact(activeAccount, { x: cellX, y: cellY, color: rgbaToHex(selectedColor) })
          console.log(optimisticPixels[optimisticPixels.length - 1])
        })
      }

      mouseDownPosRef.current = null
      isDraggingRef.current = false
    },
    [gridState, selectedColor, activeAccount, optimisticPixels, interact, setOptimisticPixels],
  )

  const handleWheel = useCallback(
    (e: React.WheelEvent<HTMLCanvasElement>) => {
      const { x, y } = convertClientPosToCanvasPos(canvasRef, e.clientX, e.clientY)

      if (e.ctrlKey) {
        // TrackPad pinch gesture
        const delta = -e.deltaY * 0.01
        setGridState((prev) => {
          const newScale = Math.max(MIN_SCALE, Math.min(MAX_SCALE, prev.scale * (1 + delta)))
          const worldX = prev.offsetX + x / prev.scale
          const worldY = prev.offsetY + y / prev.scale
          const newOffsetX = Math.max(0, worldX - x / newScale)
          const newOffsetY = Math.max(0, worldY - y / newScale)
          return { ...prev, scale: newScale, offsetX: newOffsetX, offsetY: newOffsetY }
        })
        if (Math.abs(e.deltaY) < 2) {
          console.log('fetching pixels')
          // fetchPixels();
        }
      } else {
        // Regular mouse wheel or swipe
        setGridState((prev) => ({
          ...prev,
          offsetX: Math.max(0, prev.offsetX + e.deltaX / prev.scale),
          offsetY: Math.max(0, prev.offsetY + e.deltaY / prev.scale),
        }))

        if (Math.abs(e.deltaX) < 2 && Math.abs(e.deltaY) < 2) {
          console.log('fetching pixels')
          // fetchPixels();
        }
      }

      startTransition(() => {
        updateCurrentMousePos(x, y)
      })
    },
    [updateCurrentMousePos, setGridState],
  )

  const animateJumpToCell = useCallback(
    (x: number, y: number, duration: number = 500) => {
      const canvas = canvasRef.current
      if (!canvas) return

      const canvasWidth = canvas.width
      const canvasHeight = canvas.height

      const startTime = performance.now()
      const startOffsetX = gridState.offsetX
      const startOffsetY = gridState.offsetY

      const targetOffsetX = Math.max(
        0,
        x * BASE_CELL_SIZE + BASE_CELL_SIZE / 2 - canvasWidth / (2 * gridState.scale),
      )
      const targetOffsetY = Math.max(
        0,
        y * BASE_CELL_SIZE + BASE_CELL_SIZE / 2 - canvasHeight / (2 * gridState.scale),
      )

      const animateFrame = () => {
        const elapsedTime = performance.now() - startTime
        const progress = Math.min(elapsedTime / duration, 1)

        // easing function (optional: smooth movement)
        const easeProgress = 1 - Math.pow(1 - progress, 3)

        setGridState((prev) => ({
          ...prev,
          offsetX: startOffsetX + (targetOffsetX - startOffsetX) * easeProgress,
          offsetY: startOffsetY + (targetOffsetY - startOffsetY) * easeProgress,
        }))

        if (progress < 1) {
          requestAnimationFrame(animateFrame)
        } else {
          startTransition(() => {
            setCurrentMousePos({ x, y })
          })
        }
      }

      requestAnimationFrame(animateFrame)
    },
    [gridState, setGridState, setCurrentMousePos],
  )

  const handleTouchStart = useCallback(
    (e: React.TouchEvent<HTMLCanvasElement>) => {
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

        updateCurrentMousePos(x, y)
        touchStartPosRef.current = { x, y }
        lastTouchPosRef.current = { x: touch.clientX, y: touch.clientY }

        // Add a timestamp for the touch start
        gestureRef.current.gestureStartTime = performance.now()

        if (inertiaRef.current.animationFrame) {
          cancelAnimationFrame(inertiaRef.current.animationFrame)
        }
      }
    },
    [updateCurrentMousePos],
  )

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
          setGridState((prev) => {
            const zoomFactor =
              currentDistance / (gestureRef.current.lastPinchDistance || currentDistance)
            const newScale = Math.max(MIN_SCALE, Math.min(MAX_SCALE, prev.scale * zoomFactor))
            return { ...prev, scale: newScale }
          })
        } else {
          setGridState((prev) => ({
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

        startTransition(() => {
          updateCurrentMousePos(x, y)
        })

        const dx = x - touchStartPosRef.current.x
        const dy = y - touchStartPosRef.current.y

        if (
          !isDraggingRef.current &&
          (Math.abs(dx) > SWIPE_THRESHOLD || Math.abs(dy) > SWIPE_THRESHOLD)
        ) {
          isDraggingRef.current = true
        }

        if (isDraggingRef.current) {
          const currentTime = performance.now()
          const deltaTime = currentTime - inertiaRef.current.lastTime
          inertiaRef.current.speedX = (dx / deltaTime) * 15 // 係数を増やして慣性を強く
          inertiaRef.current.speedY = (dy / deltaTime) * 15
          inertiaRef.current.lastTime = currentTime

          setGridState((prev) => ({
            ...prev,
            offsetX: Math.max(0, prev.offsetX - dx / prev.scale),
            offsetY: Math.max(0, prev.offsetY - dy / prev.scale),
          }))
          touchStartPosRef.current = { x, y }
        }
      }
    },
    [updateCurrentMousePos, setGridState],
  )

  const handleInertia = useCallback(() => {
    const { speedX, speedY, animationFrame } = inertiaRef.current

    if (Math.abs(speedX) > INERTIA_STOP_THRESHOLD || Math.abs(speedY) > INERTIA_STOP_THRESHOLD) {
      setGridState((prev) => ({
        ...prev,
        offsetX: Math.max(0, prev.offsetX - speedX / prev.scale),
        offsetY: Math.max(0, prev.offsetY - speedY / prev.scale),
      }))

      inertiaRef.current.speedX *= INERTIA_DAMPING
      inertiaRef.current.speedY *= INERTIA_DAMPING

      inertiaRef.current.animationFrame = requestAnimationFrame(handleInertia)
    } else {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
        inertiaRef.current.animationFrame = null
      }
      // fetchPixels();
    }
  }, [setGridState])

  const handleTouchEnd = useCallback(
    async (e: React.TouchEvent<HTMLCanvasElement>) => {
      e.preventDefault()
      const wasPinchGesture = gestureRef.current.isGesture
      gestureRef.current.isGesture = false
      gestureRef.current.gestureType = null

      const canvas = canvasRef.current
      if (!canvas) return

      if (isDraggingRef.current) {
        if (inertiaRef.current.animationFrame) {
          cancelAnimationFrame(inertiaRef.current.animationFrame)
        }
        inertiaRef.current.animationFrame = requestAnimationFrame(handleInertia)
      } else if (wasPinchGesture) {
        // fetchPixels();
      }

      isDraggingRef.current = false
    },
    [handleInertia],
  )

  const handlePinchZoom = useCallback(
    (e: TouchEvent) => {
      if (e.touches.length !== 2) return

      const touch1 = e.touches[0]
      const touch2 = e.touches[1]
      const dist = Math.hypot(touch1.clientX - touch2.clientX, touch1.clientY - touch2.clientY)

      const { x: centerX, y: centerY } = convertClientPosToCanvasPos(
        canvasRef,
        (touch1.clientX + touch2.clientX) / 2,
        touch1.clientY + touch2.clientY,
      )

      setGridState((prev) => {
        const newScale = Math.max(
          MIN_SCALE,
          Math.min(MAX_SCALE, prev.scale * (dist / (prev.lastPinchDist || dist))),
        )

        const worldCenterX = prev.offsetX + centerX / prev.scale
        const worldCenterY = prev.offsetY + centerY / prev.scale

        const newOffsetX = worldCenterX - centerX / newScale
        const newOffsetY = worldCenterY - centerY / newScale

        return {
          offsetX: newOffsetX,
          offsetY: newOffsetY,
          scale: newScale,
          lastPinchDist: dist,
        }
      })
    },
    [setGridState],
  )

  const animate = useCallback(() => {
    drawGrid()
    drawPixels(optimisticPixels)
  }, [drawGrid, drawPixels, optimisticPixels])

  // Effects
  useEffect(() => {
    requestAnimationFrame(animate)
  }, [animate])

  // initial fetch
  // useEffect(() => {
  //   fetchPixels();
  // }, []);

  // resize observer
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const gl = glRef.current
    if (!gl) return

    const resizeObserver = new ResizeObserver(() => {
      canvas.width = canvas.clientWidth
      canvas.height = canvas.clientHeight
      gl.viewport(0, 0, canvas.width, canvas.height)
      animate()
    })

    resizeObserver.observe(canvas)

    return () => {
      resizeObserver.disconnect()
    }
  }, [glRef, animate])

  return {
    canvasRef,
    selectedColor,
    currentMousePos,
    setSelectedColor,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleWheel,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    handlePinchZoom,
    animateJumpToCell,
  }
}
