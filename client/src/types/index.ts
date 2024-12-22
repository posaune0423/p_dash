import { SchemaType, type BlockType } from '@/libs/dojo/typescript/models.gen'
import { ParsedEntity } from '@dojoengine/sdk'
import { Draft, Patch } from 'immer'

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

// ============= not exported interfaces in dojo sdk =============

interface PendingTransaction {
  transactionId: string
  patches: Patch[]
  inversePatches: Patch[]
}

export interface GameState<T extends SchemaType> {
  entities: Record<string, ParsedEntity<T>>
  pendingTransactions: Record<string, PendingTransaction>
  setEntities: (entities: ParsedEntity<T>[]) => void
  updateEntity: (entity: Partial<ParsedEntity<T>>) => void
  applyOptimisticUpdate: (transactionId: string, updateFn: (draft: Draft<GameState<T>>) => void) => void
  revertOptimisticUpdate: (transactionId: string) => void
  confirmTransaction: (transactionId: string) => void
  subscribeToEntity: (entityId: string, listener: (entity: ParsedEntity<T> | undefined) => void) => () => void
  waitForEntityChange: (
    entityId: string,
    predicate: (entity: ParsedEntity<T> | undefined) => boolean,
    timeout?: number,
  ) => Promise<ParsedEntity<T> | undefined>
  getEntity: (entityId: string) => ParsedEntity<T> | undefined
  getEntities: (filter?: (entity: ParsedEntity<T>) => boolean) => ParsedEntity<T>[]
  getEntitiesByModel: (namespace: keyof T, model: keyof T[keyof T]) => ParsedEntity<T>[]
}
