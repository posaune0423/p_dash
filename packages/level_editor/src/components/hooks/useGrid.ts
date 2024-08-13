// import { useState, useCallback, useRef } from "react";
// import { GridState, ProgramInfo, Color, ClickedCell, GridDimensions } from "../FiniteWebGLGrid/types";

// const MIN_SCALE = 0.5;
// const MAX_SCALE = 2;

// // Vertex shader source code
// const vsSource = `
//   attribute vec4 aVertexPosition;
//   uniform vec2 uResolution;
//   uniform vec2 uOffset;
//   uniform float uScale;
//   void main() {
//     vec2 zeroToOne = (aVertexPosition.xy + uOffset) / uResolution;
//     vec2 zeroToTwo = zeroToOne * 2.0;
//     vec2 clipSpace = zeroToTwo - 1.0;
//     gl_Position = vec4(clipSpace * vec2(1, -1) * uScale, 0, 1);
//   }
// `;

// // Fragment shader source code
// const fsSource = `
//   precision mediump float;
//   uniform vec4 uColor;
//   void main() {
//     gl_FragColor = uColor;
//   }
// `;

// function createShader(gl: WebGLRenderingContext, type: number, source: string): WebGLShader | null {
//   const shader = gl.createShader(type);
//   if (!shader) return null;

//   gl.shaderSource(shader, source);
//   gl.compileShader(shader);

//   if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
//     console.error("An error occurred compiling the shaders: " + gl.getShaderInfoLog(shader));
//     gl.deleteShader(shader);
//     return null;
//   }

//   return shader;
// }

// function createProgram(
//   gl: WebGLRenderingContext,
//   vertexShader: WebGLShader,
//   fragmentShader: WebGLShader
// ): WebGLProgram | null {
//   const program = gl.createProgram();
//   if (!program) return null;

//   gl.attachShader(program, vertexShader);
//   gl.attachShader(program, fragmentShader);
//   gl.linkProgram(program);

//   if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
//     console.error("Unable to initialize the shader program: " + gl.getProgramInfoLog(program));
//     return null;
//   }

//   return program;
// }

// export const useGrid = (
//   gridDimensions: GridDimensions,
//   backgroundColor: Color,
//   baseCellSize: number
// ) => {
//   // Grid State
//   const canvasRef = useRef<HTMLCanvasElement>(null);
//   const [gridState, setGridState] = useState<GridState>({ offsetX: 0, offsetY: 0, scale: 1 });

//   // WebGL Setup
//   const [gl, setGl] = useState<WebGLRenderingContext | null>(null);
//   const [programInfo, setProgramInfo] = useState<ProgramInfo | null>(null);
//   const [positionBuffer, setPositionBuffer] = useState<WebGLBuffer | null>(null);

//   // Clicked Cells
//   const [clickedCells, setClickedCells] = useState<ClickedCell[]>([]);

//   // Grid Interactions
//   const isDraggingRef = useRef(false);
//   const lastMousePosRef = useRef({ x: 0, y: 0 });

//   const getMinScale = useCallback(
//     (canvasWidth: number, canvasHeight: number): number => {
//       const scaleX = canvasWidth / gridDimensions.width;
//       const scaleY = canvasHeight / gridDimensions.height;
//       return Math.max(scaleX, scaleY);
//     },
//     [gridDimensions]
//   );

//   const getMaxOffset = useCallback(
//     (scale: number, canvasWidth: number, canvasHeight: number): { maxOffsetX: number; maxOffsetY: number } => {
//       const visibleWidth = canvasWidth / scale;
//       const visibleHeight = canvasHeight / scale;

//       const maxOffsetX = Math.max(0, gridDimensions.width - visibleWidth);
//       const maxOffsetY = Math.max(0, gridDimensions.height - visibleHeight);

//       return { maxOffsetX, maxOffsetY };
//     },
//     [gridDimensions]
//   );

//   const toggleClickedCell = useCallback((x: number, y: number) => {
//     setClickedCells((prev) => {
//       const index = prev.findIndex((cell) => cell.x === x && cell.y === y);
//       if (index !== -1) {
//         return prev.filter((_, i) => i !== index);
//       } else {
//         return [...prev, { x, y }];
//       }
//     });
//   }, []);

//   const initializeWebGL = useCallback(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) {
//       console.error("Canvas not found");
//       return;
//     }

//     const context = canvas.getContext("webgl");
//     if (!context) {
//       console.error("WebGL context not found");
//       return;
//     }

//     setGl(context);

//     const vertexShader = createShader(context, context.VERTEX_SHADER, vsSource);
//     const fragmentShader = createShader(context, context.FRAGMENT_SHADER, fsSource);

//     if (!vertexShader || !fragmentShader) {
//       console.error("Failed to create shaders");
//       return;
//     }

//     const shaderProgram = createProgram(context, vertexShader, fragmentShader);

//     if (!shaderProgram) {
//       console.error("Failed to create shader program");
//       return;
//     }

//     const programInfo: ProgramInfo = {
//       program: shaderProgram,
//       attribLocations: {
//         position: context.getAttribLocation(shaderProgram, "aVertexPosition"),
//       },
//       uniformLocations: {
//         resolution: context.getUniformLocation(shaderProgram, "uResolution"),
//         offset: context.getUniformLocation(shaderProgram, "uOffset"),
//         scale: context.getUniformLocation(shaderProgram, "uScale"),
//         color: context.getUniformLocation(shaderProgram, "uColor"),
//       },
//     };

//     setProgramInfo(programInfo);

//     const positionBuffer = context.createBuffer();
//     setPositionBuffer(positionBuffer);

//     // Set initial viewport
//     context.viewport(0, 0, canvas.width, canvas.height);
//   }, []);

//   const drawGrid = useCallback(() => {
//     if (!gl || !programInfo || !positionBuffer) {
//       console.error("Missing GL context, program info, or position buffer");
//       return;
//     }

//     gl.clearColor(backgroundColor.r, backgroundColor.g, backgroundColor.b, backgroundColor.a);
//     gl.clear(gl.COLOR_BUFFER_BIT);

//     gl.useProgram(programInfo.program);

//     const canvasWidth = gl.canvas.width;
//     const canvasHeight = gl.canvas.height;

//     gl.uniform2f(programInfo.uniformLocations.resolution, canvasWidth, canvasHeight);
//     gl.uniform2f(programInfo.uniformLocations.offset, gridState.offsetX, gridState.offsetY);
//     gl.uniform1f(programInfo.uniformLocations.scale, gridState.scale);

//     // Draw grid lines
//     // ... (implement grid line drawing)

//     // Draw clicked cells
//     // ... (implement clicked cell drawing)
//   }, [canvasRef, gl, programInfo, positionBuffer, gridState, clickedCells, backgroundColor]);

//   const handleWheel = useCallback(
//     (e: WheelEvent) => {
//       e.preventDefault();
//       const canvas = canvasRef.current;
//       if (!canvas) return;

//       const scaleFactor = e.deltaY > 0 ? 0.9 : 1.1;
//       setGridState((prev: GridState) => {
//         const minScale = getMinScale(canvas.width, canvas.height);
//         const newScale = Math.max(minScale, Math.min(MAX_SCALE, prev.scale * scaleFactor));
//         const mouseX = e.clientX - canvas.offsetLeft;
//         const mouseY = e.clientY - canvas.offsetTop;
//         const newOffsetX = prev.offsetX + (mouseX / prev.scale - mouseX / newScale);
//         const newOffsetY = prev.offsetY + (mouseY / prev.scale - mouseY / newScale);
//         const { maxOffsetX, maxOffsetY } = getMaxOffset(newScale, canvas.width, canvas.height);
//         return {
//           offsetX: Math.max(0, Math.min(maxOffsetX, newOffsetX)),
//           offsetY: Math.max(0, Math.min(maxOffsetY, newOffsetY)),
//           scale: newScale,
//         };
//       });
//     },
//     [canvasRef, setGridState, getMinScale, getMaxOffset]
//   );

//   const handleMouseDown = useCallback((e: MouseEvent) => {
//     isDraggingRef.current = true;
//     lastMousePosRef.current = { x: e.clientX, y: e.clientY };
//   }, []);

//   const handleMouseMove = useCallback(
//     (e: MouseEvent) => {
//       if (!isDraggingRef.current) return;

//       const canvas = canvasRef.current;
//       if (!canvas) return;

//       const dx = e.clientX - lastMousePosRef.current.x;
//       const dy = e.clientY - lastMousePosRef.current.y;
//       setGridState((prev: GridState) => {
//         const newOffsetX = prev.offsetX - dx / prev.scale;
//         const newOffsetY = prev.offsetY - dy / prev.scale;
//         const { maxOffsetX, maxOffsetY } = getMaxOffset(prev.scale, canvas.width, canvas.height);
//         return {
//           ...prev,
//           offsetX: Math.max(0, Math.min(maxOffsetX, newOffsetX)),
//           offsetY: Math.max(0, Math.min(maxOffsetY, newOffsetY)),
//         };
//       });
//       lastMousePosRef.current = { x: e.clientX, y: e.clientY };
//     },
//     [canvasRef, setGridState, getMaxOffset]
//   );

//   const handleMouseUp = useCallback(
//     (e: MouseEvent) => {
//       if (!isDraggingRef.current) {
//         const canvas = canvasRef.current;
//         if (!canvas) return;

//         const rect = canvas.getBoundingClientRect();
//         const x = e.clientX - rect.left;
//         const y = e.clientY - rect.top;

//         const cellX = Math.floor((x / gridState.scale + gridState.offsetX) / baseCellSize);
//         const cellY = Math.floor((y / gridState.scale + gridState.offsetY) / baseCellSize);

//         toggleClickedCell(cellX, cellY);
//       }
//       isDraggingRef.current = false;
//     },
//     [canvasRef, gridState, toggleClickedCell, baseCellSize]
//   );

//   return {
//     canvasRef,
//     gridState,
//     setGridState,
//     gl,
//     programInfo,
//     positionBuffer,
//     clickedCells,
//     initializeWebGL,
//     drawGrid,
//     handleWheel,
//     handleMouseDown,
//     handleMouseMove,
//     handleMouseUp,
//     getMinScale,
//     getMaxOffset,
//     MIN_SCALE,
//     MAX_SCALE,
//   };
// };
