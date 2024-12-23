

// import { useComponentValue, useEntityQuery, useQuerySync } from '@dojoengine/react'
// import { getComponentValue, HasValue } from '@dojoengine/recs'
// import { getEntityIdFromKeys } from '@dojoengine/utils'
// import {
//   startTransition,
//   useCallback,
//   useEffect,
//   useLayoutEffect,
//   useMemo,
//   useRef,
//   useState,
// } from 'react'
// import { BASE_CELL_SIZE, MAX_SCALE, MIN_SCALE, SWIPE_THRESHOLD } from '@/constants/canvas'
// import { useDojo } from '@/hooks/useDojo'
// import { useGridState } from '@/hooks/useGridState'
// import { BlockType } from '@/libs/dojo/typescript/models.gen'
// import { type GridState, type Block } from '@/types'
// import { convertClientPosToCanvasPos } from '@/utils/canvas'
// import { getPinchDistance, getTouchPositions } from '@/utils/gestures'
// import { GRID_HEIGHT, GRID_WIDTH } from '@/utils/stageHelper'

// const blockTypeToImage = {
//   [BlockType.Block]: 'block.png',
//   [BlockType.Spike]: 'spike.png',
//   [BlockType.Tile]: 'tile.png',
// }

// export const useStageEditor = (stageId?: string) => {
//   // Refs
//   const canvasRef = useRef<HTMLCanvasElement | null>(null)
//   const ctxRef = useRef<CanvasRenderingContext2D | null>(null)
//   const imageCache = useRef<Map<string, HTMLImageElement>>(new Map())
//   const isDraggingRef = useRef<boolean>(false)
//   const lastTouchPosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 })
//   const touchStartPosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 })
//   const gestureRef = useRef({
//     lastPinchDistance: null as number | null,
//     lastTouchPositions: null as { x: number; y: number }[] | null,
//     isGesture: false,
//     gestureType: null as string | null,
//     gestureStartTime: null as number | null,
//   })

//   const [selectedElement, setSelectedElement] = useState<BlockType | null>(null)
//   const handleSelectElement = (element: BlockType) => {
//     setSelectedElement(element)
//   }

//   // Other Hooks
//   const {
//     setup: {
//       toriiClient,
//       clientComponents: { Block, Stage },
//       contractComponents,
//     },
//   } = useDojo()

//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   useQuerySync(toriiClient, [contractComponents.Block], [])

//   const stage = useComponentValue(Stage, getEntityIdFromKeys([BigInt(stageId ?? 0)]))
//   const blockEntities = useEntityQuery([HasValue(Block, { stage_id: BigInt(stageId ?? 0) })])

//   const initialBlocks = useMemo(() => {
//     return blockEntities
//       .map((entity) => {
//         const block = getComponentValue(Block, entity)
//         return {
//           x: Number(block?.x) - Number(stage?.x),
//           y: Number(block?.y) - Number(stage?.y),
//           type: block?.blocktype as unknown as BlockType,
//           image: `/assets/stage/easy/${blockTypeToImage[block?.blocktype as unknown as BlockType]}`,
//         } as Block
//       })
//       .filter((block) => block.type !== BlockType.Empty && block.type !== BlockType.InitBlock)
//   }, [blockEntities, Block, stage])

//   const { gridState, setGridState } = useGridState()
//   const [currentBlocks, setCurrentBlocks] = useState<Block[]>(initialBlocks)

//   const loadImage = useCallback((src: string): Promise<HTMLImageElement> => {
//     return new Promise((resolve, reject) => {
//       if (imageCache.current.has(src)) {
//         resolve(imageCache.current.get(src)!)
//       } else {
//         const img = new Image()
//         img.onload = () => {
//           imageCache.current.set(src, img)
//           resolve(img)
//         }
//         img.onerror = reject
//         img.src = src
//       }
//     })
//   }, [])

//   const drawGrid = useCallback(() => {
//     const ctx = ctxRef.current
//     const canvas = canvasRef.current
//     if (!ctx || !canvas) return

//     ctx.clearRect(0, 0, canvas.width, canvas.height)

//     const startX = Math.floor(gridState.offsetX / BASE_CELL_SIZE)
//     const startY = Math.floor(gridState.offsetY / BASE_CELL_SIZE)
//     const endX = Math.ceil((gridState.offsetX + canvas.width / gridState.scale) / BASE_CELL_SIZE)
//     const endY = Math.ceil((gridState.offsetY + canvas.height / gridState.scale) / BASE_CELL_SIZE)

//     ctx.beginPath()
//     ctx.strokeStyle = 'rgba(200, 200, 200, 0.5)'
//     ctx.lineWidth = 1 / gridState.scale

//     for (let x = startX; x <= endX; x++) {
//       const screenX = (x * BASE_CELL_SIZE - gridState.offsetX) * gridState.scale
//       ctx.moveTo(screenX, 0)
//       ctx.lineTo(screenX, canvas.height)
//     }

//     for (let y = startY; y <= endY; y++) {
//       const screenY = (y * BASE_CELL_SIZE - gridState.offsetY) * gridState.scale
//       ctx.moveTo(0, screenY)
//       ctx.lineTo(canvas.width, screenY)
//     }

//     ctx.stroke()
//   }, [gridState])

//   const setLimitedGridState = useCallback(
//     (updater: (prev: GridState) => GridState) => {
//       setGridState((prev) => {
//         const newState = updater(prev)
//         const canvas = canvasRef.current

//         const maxOffsetX = Math.max(
//           0,
//           GRID_WIDTH * BASE_CELL_SIZE - (canvas?.clientWidth || 0) / newState.scale,
//         )
//         const maxOffsetY = Math.max(
//           0,
//           GRID_HEIGHT * BASE_CELL_SIZE - (canvas?.clientHeight || 0) / newState.scale,
//         )
//         return {
//           ...newState,
//           offsetX: Math.min(Math.max(0, newState.offsetX), maxOffsetX),
//           offsetY: Math.min(Math.max(0, newState.offsetY), maxOffsetY),
//         }
//       })
//     },
//     [setGridState],
//   )

//   const handleTouchStart = useCallback((e: React.TouchEvent<HTMLCanvasElement>) => {
//     if (e.touches.length === 2) {
//       gestureRef.current.isGesture = true
//       gestureRef.current.gestureStartTime = performance.now()
//       gestureRef.current.lastPinchDistance = getPinchDistance(e.touches)
//       gestureRef.current.lastTouchPositions = getTouchPositions(e.touches)
//       gestureRef.current.gestureType = null
//     } else {
//       isDraggingRef.current = false
//       const touch = e.touches[0]
//       const canvas = canvasRef.current
//       if (!canvas) return

//       const rect = canvas.getBoundingClientRect()
//       const x = touch.clientX - rect.left
//       const y = touch.clientY - rect.top
//       touchStartPosRef.current = { x, y }
//       lastTouchPosRef.current = { x: touch.clientX, y: touch.clientY }

//       // Add a timestamp for the touch start
//       gestureRef.current.gestureStartTime = performance.now()
//     }
//   }, [])

//   const handleTouchMove = useCallback(
//     (e: React.TouchEvent<HTMLCanvasElement>) => {
//       if (e.touches.length === 2 && gestureRef.current.isGesture) {
//         const currentDistance = getPinchDistance(e.touches)
//         const currentPositions = getTouchPositions(e.touches)
//         const pinchDelta = currentDistance - (gestureRef.current.lastPinchDistance || 0)
//         const moveDelta = {
//           x:
//             (currentPositions[0].x + currentPositions[1].x) / 2 -
//             ((gestureRef.current.lastTouchPositions?.[0].x || 0) +
//               (gestureRef.current.lastTouchPositions?.[1].x || 0)) /
//               2,
//           y:
//             (currentPositions[0].y + currentPositions[1].y) / 2 -
//             ((gestureRef.current.lastTouchPositions?.[0].y || 0) +
//               (gestureRef.current.lastTouchPositions?.[1].y || 0)) /
//               2,
//         }

//         if (!gestureRef.current.gestureType) {
//           if (
//             Math.abs(pinchDelta) > Math.abs(moveDelta.x) &&
//             Math.abs(pinchDelta) > Math.abs(moveDelta.y)
//           ) {
//             gestureRef.current.gestureType = 'pinch'
//           } else {
//             gestureRef.current.gestureType = 'swipe'
//           }
//         }

//         if (gestureRef.current.gestureType === 'pinch') {
//           setLimitedGridState((prev) => {
//             const zoomFactor =
//               currentDistance / (gestureRef.current.lastPinchDistance || currentDistance)
//             const newScale = Math.max(MIN_SCALE, Math.min(MAX_SCALE, prev.scale * zoomFactor))
//             return { ...prev, scale: newScale }
//           })
//         } else {
//           setLimitedGridState((prev) => ({
//             ...prev,
//             offsetX: Math.max(0, prev.offsetX - moveDelta.x / prev.scale),
//             offsetY: Math.max(0, prev.offsetY - moveDelta.y / prev.scale),
//           }))
//         }

//         gestureRef.current.lastPinchDistance = currentDistance
//         gestureRef.current.lastTouchPositions = currentPositions
//       } else if (e.touches.length === 1) {
//         const touch = e.touches[0]
//         const { x, y } = convertClientPosToCanvasPos(canvasRef, touch.clientX, touch.clientY)

//         const dx = x - touchStartPosRef.current.x
//         const dy = y - touchStartPosRef.current.y

//         if (
//           !isDraggingRef.current &&
//           (Math.abs(dx) > SWIPE_THRESHOLD || Math.abs(dy) > SWIPE_THRESHOLD)
//         ) {
//           isDraggingRef.current = true
//         }

//         if (isDraggingRef.current) {
//           setLimitedGridState((prev) => ({
//             ...prev,
//             offsetX: Math.max(0, prev.offsetX - dx / prev.scale),
//             offsetY: Math.max(0, prev.offsetY - dy / prev.scale),
//           }))
//           touchStartPosRef.current = { x, y }
//         }
//       }
//     },
//     [setLimitedGridState],
//   )

//   const handleTouchEnd = useCallback(
//     async (e: React.TouchEvent<HTMLCanvasElement>) => {
//       e.preventDefault()
//       gestureRef.current.isGesture = false
//       gestureRef.current.gestureType = null

//       if (!isDraggingRef.current && selectedElement) {
//         const canvas = canvasRef.current
//         if (!canvas) return

//         const touch = e.changedTouches[0]

//         const { x, y } = convertClientPosToCanvasPos(canvasRef, touch.clientX, touch.clientY)

//         const worldX = gridState.offsetX + x / gridState.scale
//         const worldY = gridState.offsetY + y / gridState.scale

//         const cellX = Math.floor(worldX / BASE_CELL_SIZE)
//         const cellY = Math.floor(worldY / BASE_CELL_SIZE)

//         const block = {
//           x: cellX,
//           y: cellY,
//           type: selectedElement,
//           image: `/assets/stage/easy/${blockTypeToImage[selectedElement]}`,
//         } as Block

//         startTransition(async () => {
//           const existingBlockIndex = currentBlocks.findIndex(
//             (b) => b.x === block.x && b.y === block.y && b.type === block.type,
//           )

//           if (existingBlockIndex !== -1) {
//             const existingBlock = currentBlocks[existingBlockIndex]
//             const isInitialBlock = initialBlocks.some(
//               (b) =>
//                 b.x === existingBlock.x && b.y === existingBlock.y && b.type === existingBlock.type,
//             )

//             if (isInitialBlock) {
//               setCurrentBlocks((prev) =>
//                 prev.map((b, index) =>
//                   index === existingBlockIndex ? { ...b, type: BlockType.Empty, image: '' } : b,
//                 ),
//               )
//             } else {
//               setCurrentBlocks((prev) => prev.filter((_, index) => index !== existingBlockIndex))
//             }
//           } else {
//             setCurrentBlocks((prev) => [...prev, block])
//           }

//           if (block.type !== BlockType.Empty) {
//             await loadImage(block.image)
//           }
//         })
//       }

//       isDraggingRef.current = false
//     },
//     [gridState, selectedElement, currentBlocks, initialBlocks, loadImage, setCurrentBlocks],
//   )

//   const drawBlock = useCallback(
//     async (block: Block) => {
//       const ctx = ctxRef.current
//       const canvas = canvasRef.current
//       if (!ctx || !canvas) return

//       const screenX = (block.x * BASE_CELL_SIZE - gridState.offsetX) * gridState.scale
//       const screenY = (block.y * BASE_CELL_SIZE - gridState.offsetY) * gridState.scale
//       const size = BASE_CELL_SIZE * gridState.scale

//       const image = await loadImage(block.image)
//       ctx.drawImage(image, screenX, screenY, size, size)
//     },
//     [gridState, loadImage],
//   )

//   const animate = useCallback(async () => {
//     const ctx = ctxRef.current
//     const canvas = canvasRef.current
//     if (!ctx || !canvas) return

//     ctx.clearRect(0, 0, canvas.width, canvas.height)
//     drawGrid()
//     for (let i = 0; i < currentBlocks.length; i++) {
//       if (currentBlocks[i].type !== BlockType.Empty) {
//         await drawBlock(currentBlocks[i])
//       }
//     }
//   }, [drawGrid, drawBlock, currentBlocks])

//   useEffect(() => {
//     const animateFrame = requestAnimationFrame(animate)

//     return () => {
//       cancelAnimationFrame(animateFrame)
//     }
//   }, [animate, gridState])

//   // Effects
//   useEffect(() => {
//     const canvas = canvasRef.current
//     if (canvas) {
//       ctxRef.current = canvas.getContext('2d')
//     }
//   }, [])

//   useLayoutEffect(() => {
//     const canvas = canvasRef.current
//     if (!canvas) return

//     const ctx = canvas.getContext('2d')
//     if (!ctx) return
//     ctxRef.current = ctx

//     const resizeCanvas = () => {
//       const dpr = window.devicePixelRatio || 1
//       const width = window.visualViewport?.width || window.innerWidth
//       const height = canvas.clientHeight

//       // Canvasのサイズ設定
//       canvas.width = width * dpr
//       canvas.height = height * dpr

//       // コンテキストのスケーリング設定
//       ctx.setTransform(1, 0, 0, 1, 0, 0)
//       ctx.scale(dpr, dpr)
//       animate()
//     }

//     // デバイスの向きが横向き（ランドスケープ）か縦向きかを確認してリサイズ
//     const handleOrientationChange = () => {
//       if (window.orientation === 90 || window.orientation === -90) {
//         console.log('landscape')
//         // 横向きの場合
//         resizeCanvas()
//       } else {
//         console.log('portrait')
//         // 縦向きの場合も再描画
//         resizeCanvas()
//       }
//     }

//     // 初期ロード時にオリエンテーションを確認してリサイズ
//     handleOrientationChange()

//     // オリエンテーション変更をリッスン
//     window.addEventListener('orientationchange', handleOrientationChange)

//     return () => {
//       window.removeEventListener('orientationchange', handleOrientationChange)
//     }
//   }, [animate])

//   return {
//     canvasRef,
//     selectedElement,
//     currentBlocks,
//     handleTouchStart,
//     handleTouchMove,
//     handleTouchEnd,
//     handleSelectElement,
//   }
// }
