import { useEntityQuery } from "@dojoengine/react";
import { getComponentValue, Has } from "@dojoengine/recs";
import { startTransition, useCallback, useEffect, useMemo, useOptimistic, useRef, useState } from "react";
import { BASE_CELL_SIZE, COLOR_PALETTE, DEFAULT_GRID_DIMENSIONS, MAX_SCALE, MIN_SCALE, SWIPE_THRESHOLD } from "./const";
import { type ColoredCell, type Color, type GridDimensions, type GridState, type ProgramInfo } from "./types";
import { initShaderProgram } from "./webgl";
import { useDojo } from "@/lib/dojo/useDojo";
import { hexToRgba, rgbaToHex } from "@/utils";

export const usePixelViewer = (backgroundColor: Color, gridColor: Color) => {
  // Refs
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isDraggingRef = useRef<boolean>(false);
  const lastTouchPosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const mouseDownPosRef = useRef<{ x: number; y: number } | null>(null);
  const touchStartPosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const glRef = useRef<WebGLRenderingContext | null>(null);
  const programInfoRef = useRef<ProgramInfo | null>(null);
  const positionBufferRef = useRef<WebGLBuffer | null>(null);

  // States
  const [gridState, setGridState] = useState<GridState>({ offsetX: 0, offsetY: 0, scale: 1 });
  const [gridDimensions] = useState<GridDimensions>(DEFAULT_GRID_DIMENSIONS);
  const [selectedColor, setSelectedColor] = useState<Color>(COLOR_PALETTE[0]);

  const {
    setup: {
      systemCalls: { interact },
      burnerManager: { account: burnerAccount },
      contractComponents: { Pixel },
    },
  } = useDojo();

  const pixelEntities = useEntityQuery([Has(Pixel)]);
  const pixels = useMemo(
    () =>
      pixelEntities
        .map((entity) => {
          const data = getComponentValue(Pixel, entity);
          if (!data) return;
          return {
            x: data.x,
            y: data.y,
            color: hexToRgba(data.color),
          };
        })
        .filter((pixel) => pixel !== undefined),
    [pixelEntities, Pixel]
  );

  const [optimisticPixels, setOptimisticPixels] = useOptimistic(pixels, (pixels, newPixel: ColoredCell) => {
    return [...pixels, newPixel];
  });

  // Handlers
  const drawGrid = useCallback(() => {
    const gl = glRef.current;
    const programInfo = programInfoRef.current;
    if (!gl || !programInfo) return;

    gl.clearColor(backgroundColor.r, backgroundColor.g, backgroundColor.b, backgroundColor.a);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.useProgram(programInfo.program);

    const canvasWidth = gl.canvas.width;
    const canvasHeight = gl.canvas.height;

    gl.uniform2f(programInfo.uniformLocations.resolution, canvasWidth, canvasHeight);
    gl.uniform2f(programInfo.uniformLocations.offset, gridState.offsetX, gridState.offsetY);
    gl.uniform1f(programInfo.uniformLocations.scale, gridState.scale);

    const visibleWidth = canvasWidth / gridState.scale;
    const visibleHeight = canvasHeight / gridState.scale;

    const startX = Math.max(0, Math.floor(gridState.offsetX / BASE_CELL_SIZE) * BASE_CELL_SIZE);
    const startY = Math.max(0, Math.floor(gridState.offsetY / BASE_CELL_SIZE) * BASE_CELL_SIZE);
    const endX = Math.min(gridDimensions.width, startX + visibleWidth + BASE_CELL_SIZE);
    const endY = Math.min(gridDimensions.height, startY + visibleHeight + BASE_CELL_SIZE);

    // Draw colored cells
    optimisticPixels.forEach((pixel) => {
      const x = pixel.x * BASE_CELL_SIZE;
      const y = pixel.y * BASE_CELL_SIZE;
      if (x >= startX && x < endX && y >= startY && y < endY) {
        gl.uniform4f(programInfo.uniformLocations.color, pixel.color.r, pixel.color.g, pixel.color.b, pixel.color.a);
        const positions = [x, y, x + BASE_CELL_SIZE, y, x, y + BASE_CELL_SIZE, x + BASE_CELL_SIZE, y + BASE_CELL_SIZE];
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBufferRef.current);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      }
    });

    // Draw grid lines
    gl.uniform4f(programInfo.uniformLocations.color, gridColor.r, gridColor.g, gridColor.b, gridColor.a);
    const positions: number[] = [];

    for (let x = startX; x <= endX; x += BASE_CELL_SIZE) {
      positions.push(x, 0, x, gridDimensions.height);
    }

    for (let y = startY; y <= endY; y += BASE_CELL_SIZE) {
      positions.push(0, y, gridDimensions.width, y);
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, positionBufferRef.current);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    gl.enableVertexAttribArray(programInfo.attribLocations.position);
    gl.vertexAttribPointer(programInfo.attribLocations.position, 2, gl.FLOAT, false, 0, 0);

    gl.drawArrays(gl.LINES, 0, positions.length / 2);
  }, [gridState, backgroundColor, gridColor, gridDimensions, optimisticPixels]);

  const getMinScale = useCallback(
    (canvasWidth: number, canvasHeight: number): number => {
      const scaleX = canvasWidth / gridDimensions.width;
      const scaleY = canvasHeight / gridDimensions.height;
      return Math.max(scaleX, scaleY, MIN_SCALE);
    },
    [gridDimensions]
  );

  const getMaxOffset = useCallback(
    (scale: number, canvasWidth: number, canvasHeight: number): { maxOffsetX: number; maxOffsetY: number } => {
      const visibleWidth = canvasWidth / scale;
      const visibleHeight = canvasHeight / scale;

      const maxOffsetX = Math.max(0, gridDimensions.width - visibleWidth);
      const maxOffsetY = Math.max(0, gridDimensions.height - visibleHeight);

      return { maxOffsetX, maxOffsetY };
    },
    [gridDimensions]
  );

  const handleTouchStart = useCallback((e: React.TouchEvent<HTMLCanvasElement>) => {
    const touch = e.touches[0];
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;

    touchStartPosRef.current = { x, y };
    lastTouchPosRef.current = { x: touch.clientX, y: touch.clientY };
  }, []);

  const handleTouchMove = useCallback(
    (e: React.TouchEvent<HTMLCanvasElement>) => {
      const touch = e.touches[0];
      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const x = touch.clientX - rect.left;
      const y = touch.clientY - rect.top;

      const dx = x - touchStartPosRef.current.x;
      const dy = y - touchStartPosRef.current.y;

      if (Math.abs(dx) > SWIPE_THRESHOLD || Math.abs(dy) > SWIPE_THRESHOLD) {
        isDraggingRef.current = true;
      }

      if (isDraggingRef.current) {
        setGridState((prev) => {
          const newOffsetX = prev.offsetX - dx / prev.scale;
          const newOffsetY = prev.offsetY - dy / prev.scale;
          const { maxOffsetX, maxOffsetY } = getMaxOffset(prev.scale, canvas.width, canvas.height);
          return {
            ...prev,
            offsetX: Math.max(0, Math.min(maxOffsetX, newOffsetX)),
            offsetY: Math.max(0, Math.min(maxOffsetY, newOffsetY)),
          };
        });
        touchStartPosRef.current = { x, y };
      }
    },
    [getMaxOffset]
  );

  const handleTouchEnd = useCallback(
    async (e: React.TouchEvent<HTMLCanvasElement>) => {
      e.preventDefault();
      const canvas = canvasRef.current;
      if (!canvas) return;

      if (!isDraggingRef.current) {
        const x = touchStartPosRef.current.x;
        const y = touchStartPosRef.current.y;

        const worldX = gridState.offsetX + x / gridState.scale;
        const worldY = gridState.offsetY + y / gridState.scale;

        const cellX = Math.floor(worldX / BASE_CELL_SIZE);
        const cellY = Math.floor(worldY / BASE_CELL_SIZE);

        if (!burnerAccount) {
          console.error("Burner account not found");
          return;
        }

        startTransition(async () => {
          setOptimisticPixels({ x: cellX, y: cellY, color: selectedColor });
          await interact(burnerAccount, { x: cellX, y: cellY, color: rgbaToHex(selectedColor) });
        });
      }

      isDraggingRef.current = false;
    },
    [gridState, selectedColor, burnerAccount, interact, setOptimisticPixels]
  );

  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    mouseDownPosRef.current = { x, y };
    isDraggingRef.current = false;
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      e.preventDefault();
      const canvas = canvasRef.current;
      if (!canvas || !mouseDownPosRef.current) return;

      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const dx = x - mouseDownPosRef.current.x;
      const dy = y - mouseDownPosRef.current.y;

      if (!isDraggingRef.current && (Math.abs(dx) > SWIPE_THRESHOLD / 2 || Math.abs(dy) > SWIPE_THRESHOLD / 2)) {
        isDraggingRef.current = true;
      }

      if (isDraggingRef.current) {
        setGridState((prev) => {
          const newOffsetX = prev.offsetX - dx / prev.scale;
          const newOffsetY = prev.offsetY - dy / prev.scale;
          const { maxOffsetX, maxOffsetY } = getMaxOffset(prev.scale, canvas.width, canvas.height);
          return {
            ...prev,
            offsetX: Math.max(0, Math.min(maxOffsetX, newOffsetX)),
            offsetY: Math.max(0, Math.min(maxOffsetY, newOffsetY)),
          };
        });

        mouseDownPosRef.current = { x, y };
      }
    },
    [getMaxOffset]
  );

  const handleMouseUp = useCallback(
    async (e: React.MouseEvent<HTMLCanvasElement>) => {
      e.preventDefault();
      const canvas = canvasRef.current;
      if (!canvas) return;

      if (!isDraggingRef.current && mouseDownPosRef.current) {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const worldX = gridState.offsetX + x / gridState.scale;
        const worldY = gridState.offsetY + y / gridState.scale;

        const cellX = Math.floor(worldX / BASE_CELL_SIZE);
        const cellY = Math.floor(worldY / BASE_CELL_SIZE);

        if (!burnerAccount) {
          console.error("Burner account not found");
          return;
        }

        startTransition(async () => {
          setOptimisticPixels({ x: cellX, y: cellY, color: selectedColor });
          await interact(burnerAccount, { x: cellX, y: cellY, color: rgbaToHex(selectedColor) });
        });
      }

      mouseDownPosRef.current = null;
      isDraggingRef.current = false;
    },
    [gridState, selectedColor, burnerAccount, interact, setOptimisticPixels]
  );

  const handleWheel = useCallback(
    (e: React.WheelEvent<HTMLCanvasElement>) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      setGridState((prev) => {
        const zoomFactor = e.deltaY > 0 ? 0.9 : 1.1;
        const newScale = Math.max(
          getMinScale(canvas.width, canvas.height),
          Math.min(MAX_SCALE, prev.scale * zoomFactor)
        );

        const worldX = prev.offsetX + x / prev.scale;
        const worldY = prev.offsetY + y / prev.scale;

        const newOffsetX = worldX - x / newScale;
        const newOffsetY = worldY - y / newScale;

        const { maxOffsetX, maxOffsetY } = getMaxOffset(newScale, canvas.width, canvas.height);

        return {
          offsetX: Math.max(0, Math.min(maxOffsetX, newOffsetX)),
          offsetY: Math.max(0, Math.min(maxOffsetY, newOffsetY)),
          scale: newScale,
        };
      });
    },
    [getMaxOffset, getMinScale]
  );

  const handlePinchZoom = useCallback(
    (e: TouchEvent) => {
      if (e.touches.length !== 2) return;

      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      const dist = Math.hypot(touch1.clientX - touch2.clientX, touch1.clientY - touch2.clientY);

      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const centerX = (touch1.clientX + touch2.clientX) / 2 - rect.left;
      const centerY = (touch1.clientY + touch2.clientY) / 2 - rect.top;

      setGridState((prev) => {
        const newScale = Math.max(
          getMinScale(canvas.width, canvas.height),
          Math.min(MAX_SCALE, prev.scale * (dist / (prev.lastPinchDist || dist)))
        );

        const worldCenterX = prev.offsetX + centerX / prev.scale;
        const worldCenterY = prev.offsetY + centerY / prev.scale;

        const newOffsetX = worldCenterX - centerX / newScale;
        const newOffsetY = worldCenterY - centerY / newScale;

        const { maxOffsetX, maxOffsetY } = getMaxOffset(newScale, canvas.width, canvas.height);

        return {
          offsetX: Math.max(0, Math.min(maxOffsetX, newOffsetX)),
          offsetY: Math.max(0, Math.min(maxOffsetY, newOffsetY)),
          scale: newScale,
          lastPinchDist: dist,
        };
      });
    },
    [getMaxOffset, getMinScale]
  );

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = glRef.current;
    if (!gl) return;

    const displayWidth = canvas.clientWidth;
    const displayHeight = canvas.clientHeight;

    if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
      canvas.width = displayWidth;
      canvas.height = displayHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);

      setGridState((prev) => {
        const minScale = getMinScale(canvas.width, canvas.height);
        const newScale = Math.max(minScale, prev.scale);
        const { maxOffsetX, maxOffsetY } = getMaxOffset(newScale, canvas.width, canvas.height);
        return {
          offsetX: Math.min(prev.offsetX, maxOffsetX),
          offsetY: Math.min(prev.offsetY, maxOffsetY),
          scale: newScale,
        };
      });
    }
  }, [getMaxOffset, getMinScale]);

  const animate = useCallback(() => {
    resizeCanvas();
    drawGrid();
    requestAnimationFrame(animate);
  }, [resizeCanvas, drawGrid]);

  // Effects
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      console.error("Canvas not found");
      return;
    }

    const gl = canvas.getContext("webgl");
    if (!gl) {
      console.error("WebGL not supported");
      return;
    }
    glRef.current = gl;

    const shaderProgram = initShaderProgram(gl);
    if (!shaderProgram) return;

    programInfoRef.current = {
      program: shaderProgram,
      attribLocations: {
        position: gl.getAttribLocation(shaderProgram, "aPosition"),
      },
      uniformLocations: {
        resolution: gl.getUniformLocation(shaderProgram, "uResolution"),
        offset: gl.getUniformLocation(shaderProgram, "uOffset"),
        scale: gl.getUniformLocation(shaderProgram, "uScale"),
        color: gl.getUniformLocation(shaderProgram, "uColor"),
      },
    };

    positionBufferRef.current = gl.createBuffer();

    canvas.addEventListener("touchmove", handlePinchZoom);

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      canvas.removeEventListener("touchmove", handlePinchZoom);
    };
  }, [drawGrid, getMaxOffset, getMinScale, handlePinchZoom, resizeCanvas, animate]);

  return {
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
  };
};
