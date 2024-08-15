export interface Color {
  r: number
  g: number
  b: number
  a: number
}

export interface GridDimensions {
  width: number
  height: number
}

export interface GridState {
  offsetX: number
  offsetY: number
  scale: number
  lastPinchDist?: number
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

export interface ColoredCell {
  x: number
  y: number
  color: Color
}

export type Mode = 'color' | 'drag'

export interface GridAction {
  type: 'add' | 'remove'
  cell: ColoredCell
}

export interface GridHistory {
  past: ColoredCell[][]
  present: ColoredCell[]
  future: ColoredCell[][]
}
