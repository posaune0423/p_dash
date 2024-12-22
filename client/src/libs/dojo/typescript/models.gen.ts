import type { SchemaType as ISchemaType } from '@dojoengine/sdk'

import type { BigNumberish } from 'starknet'

type RemoveFieldOrder<T> = T extends object
  ? Omit<
      {
        [K in keyof T]: T[K] extends object ? RemoveFieldOrder<T[K]> : T[K]
      },
      'fieldOrder'
    >
  : T

//  ========  Added  ========

export interface Position {
  x: number
  y: number
}

export type InputPosition = RemoveFieldOrder<Position>

export interface Bounds {
  min: Position
  max: Position
}

export type InputBounds = RemoveFieldOrder<Bounds>

export interface DefaultParameters {
  player_override: bigint | undefined
  system_override: bigint | undefined
  area_hint: number | undefined
  position: Position
  color: number
}

export type InputDefaultParameters = RemoveFieldOrder<DefaultParameters>

export interface PixelUpdate {
  x: number
  y: number
  color: number | undefined
  owner: string | undefined
  app: string | undefined
  text: string | undefined
  timestamp: number | undefined
  action: string | undefined
}

export type InputPixelUpdate = RemoveFieldOrder<PixelUpdate>

export interface Pixel {
  fieldOrder: string[]
  x: number
  y: number
  app: string
  color: number
  created_at: number
  updated_at: number
  timestamp: number
  owner: string
  text: number
  action: number
}

export type InputPixel = RemoveFieldOrder<Pixel>

// Type definition for `p_dash::models::block::Block` struct
export interface Block {
  fieldOrder: string[]
  stage_id: BigNumberish
  x: BigNumberish
  y: BigNumberish
  blocktype: BlockType
}
export type InputBlock = RemoveFieldOrder<Block>

// Type definition for `p_dash::models::block::BlockValue` struct
export interface BlockValue {
  fieldOrder: string[]
  blocktype: BlockType
}
export type InputBlockValue = RemoveFieldOrder<BlockValue>

// Type definition for `p_dash::models::stage::StageValue` struct
export interface StageValue {
  fieldOrder: string[]
  x: BigNumberish
  y: BigNumberish
  w: BigNumberish
  h: BigNumberish
  creator: string
}
export type InputStageValue = RemoveFieldOrder<StageValue>

// Type definition for `p_dash::models::stage::Stage` struct
export interface Stage {
  fieldOrder: string[]
  id: BigNumberish
  x: BigNumberish
  y: BigNumberish
  w: BigNumberish
  h: BigNumberish
  creator: string
}
export type InputStage = RemoveFieldOrder<Stage>

// Type definition for `p_dash::models::block::BlockType` enum
export enum BlockType {
  Empty,
  InitBlock,
  Block,
  Tile,
  Spike,
  Hole,
}

export interface SchemaType extends ISchemaType {
  p_dash: {
    Block: Block
    BlockValue: BlockValue
    StageValue: StageValue
    Stage: Stage
  }
}
export const schema: SchemaType = {
  p_dash: {
    Block: {
      fieldOrder: ['stage_id', 'x', 'y', 'blocktype'],
      stage_id: 0,
      x: 0,
      y: 0,
      blocktype: BlockType.Empty,
    },
    BlockValue: {
      fieldOrder: ['blocktype'],
      blocktype: BlockType.Empty,
    },
    StageValue: {
      fieldOrder: ['x', 'y', 'w', 'h', 'creator'],
      x: 0,
      y: 0,
      w: 0,
      h: 0,
      creator: '',
    },
    Stage: {
      fieldOrder: ['id', 'x', 'y', 'w', 'h', 'creator'],
      id: 0,
      x: 0,
      y: 0,
      w: 0,
      h: 0,
      creator: '',
    },
  },
}
// Type definition for ERC__Balance struct
export type ERC__Type = 'ERC20' | 'ERC721'
export interface ERC__Balance {
  fieldOrder: string[]
  balance: string
  type: string
  tokenMetadata: ERC__Token
}
export interface ERC__Token {
  fieldOrder: string[]
  name: string
  symbol: string
  tokenId: string
  decimals: string
  contractAddress: string
}
export interface ERC__Transfer {
  fieldOrder: string[]
  from: string
  to: string
  amount: string
  type: string
  executedAt: string
  tokenMetadata: ERC__Token
  transactionHash: string
}
