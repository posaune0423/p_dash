type OrientationLockType =
  | 'any'
  | 'landscape'
  | 'landscape-primary'
  | 'landscape-secondary'
  | 'natural'
  | 'portrait'
  | 'portrait-primary'
  | 'portrait-secondary'
interface ScreenOrientation extends EventTarget {
  lock(orientation: OrientationLockType): Promise<void>
}

type GameResult = {
  id: string
  stage: 'easy' | 'normal' | 'hard'
  date: Date
  result: 'clear' | 'death'
  distance: number
}

type Obstacle = {
  x: number
  y: number
  type: 'block' | 'spike' | 'tiles' | 'null'
}

type Pixel = {
  action: string
  color: number | string
  owner: string
  text: string
  timestamp: number | string
  x: number
  y: number
}

type GetPixelsResponse = {
  pixelModels: {
    edges: Array<{
      node: Pixel
    }>
  }
}

declare module '*.graphql' {
  import { type DocumentNode } from 'graphql'
  const value: DocumentNode
  export = value
}
