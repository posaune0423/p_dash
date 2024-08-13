export interface GridState {
  offsetX: number
  offsetY: number
  scale: number
}

export interface ProgramInfo {
  program: WebGLProgram
  attribLocations: {
    position: number
  }
  uniformLocations: {
    resolution: WebGLUniformLocation | null
    offset: WebGLUniformLocation | null
    scale: WebGLUniformLocation | null
    color: WebGLUniformLocation | null
  }
}

export interface GridDimensions {
  width: number
  height: number
}

export interface Color {
  r: number
  g: number
  b: number
  a: number
}
