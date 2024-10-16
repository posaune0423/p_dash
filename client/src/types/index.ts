import { type BlockType } from '@/libs/dojo/typescript/models.gen'

export type GameResult = {
  id: string
  stage: string
  date: Date
  result: 'clear' | 'death'
  distance: number
  interactions: PlayerInteraction[]
}

export type PlayerInteraction = {
  action: 'jump' | 'touch'
  timestamp: number
}

export type Block = {
  x: number
  y: number
  image: string
  type: BlockType
}

export type Obstacle = {
  x: number
  y: number
  type: BlockType
}

export type App = {
  system: string
  name: string
  manifest: string
  icon: string
  action: string
}

export interface Color {
  r: number
  g: number
  b: number
  a: number
}

export interface GridState {
  offsetX: number
  offsetY: number
  scale: number
  lastPinchDist?: number
}

export interface Pixel {
  x: number
  y: number
  color: Color
}

export interface GridAction {
  type: 'add' | 'remove'
  pixel: Pixel
}

export interface GridHistory {
  past: Pixel[][]
  present: Pixel[]
  future: Pixel[][]
}
