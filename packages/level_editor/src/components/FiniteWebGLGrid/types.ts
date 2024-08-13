interface GridState {
  offsetX: number;
  offsetY: number;
  scale: number;
}

interface ProgramInfo {
  program: WebGLProgram;
  attribLocations: {
    position: number;
  };
  uniformLocations: {
    resolution: WebGLUniformLocation | null;
    offset: WebGLUniformLocation | null;
    scale: WebGLUniformLocation | null;
    color: WebGLUniformLocation | null;
  };
}

interface GridDimensions {
  width: number;
  height: number;
}

interface Color {
  r: number;
  g: number;
  b: number;
  a: number;
}

interface FiniteWebGLGridProps {
  backgroundColor?: Color;
  gridColor?: Color;
}