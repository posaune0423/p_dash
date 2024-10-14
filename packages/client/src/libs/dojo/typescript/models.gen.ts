// Generated by dojo-bindgen on Wed, 25 Sep 2024 17:52:58 +0000. Do not modify this file manually.
// Import the necessary types from the recs SDK
// generate again with `sozo build --typescript`
import { defineComponent, Type as RecsType, type World } from '@dojoengine/recs'

export type ContractComponents = Awaited<ReturnType<typeof defineContractComponents>>

// Type definition for `dojo::model::layout::Layout` enum
export type Layout =
  | { type: 'Fixed'; value: RecsType.NumberArray }
  | { type: 'Struct'; value: RecsType.StringArray }
  | { type: 'Tuple'; value: RecsType.StringArray }
  | { type: 'Array'; value: RecsType.StringArray }
  | { type: 'ByteArray' }
  | { type: 'Enum'; value: RecsType.StringArray }

export const LayoutDefinition = {
  type: RecsType.String,
  value: RecsType.String,
}

export interface Position {
  x: number
  y: number
}
export const PositionDefinition = {
  x: RecsType.Number,
  y: RecsType.Number,
}

// Type definition for `pixelaw::core::models::registry::App` struct
export interface App {
  system: bigint
  name: bigint
  icon: bigint
  action: bigint
}
export const AppDefinition = {
  system: RecsType.BigInt,
  name: RecsType.BigInt,
  icon: RecsType.BigInt,
  action: RecsType.BigInt,
}

// Type definition for `core::byte_array::ByteArray` struct
export interface ByteArray {
  data: string[]
  pending_word: bigint
  pending_word_len: number
}
export const ByteArrayDefinition = {
  data: RecsType.StringArray,
  pending_word: RecsType.BigInt,
  pending_word_len: RecsType.Number,
}

// Type definition for `dojo::model::layout::FieldLayout` struct
export interface FieldLayout {
  selector: bigint
  layout: Layout
}
export const FieldLayoutDefinition = {
  selector: RecsType.BigInt,
  layout: LayoutDefinition,
}

// Type definition for `pixelaw::core::models::registry::AppName` struct
export interface AppName {
  name: bigint
  system: bigint
}
export const AppNameDefinition = {
  name: RecsType.BigInt,
  system: RecsType.BigInt,
}

// Type definition for `pixelaw::core::models::registry::AppUser` struct
export interface AppUser {
  system: bigint
  player: bigint
  action: bigint
}
export const AppUserDefinition = {
  system: RecsType.BigInt,
  player: RecsType.BigInt,
  action: RecsType.BigInt,
}

// Type definition for `p_dash::models::block::BlockType` enum
// export type BlockType =
//   | { type: 'Empty' }
//   | { type: 'InitBlock' }
//   | { type: 'Block' }
//   | { type: 'Tile' }
//   | { type: 'Spike' }
//   | { type: 'Hole' }

export enum BlockType {
  Empty = 'Empty',
  InitBlock = 'InitBlock',
  Block = 'Block',
  Tile = 'Tile',
  Spike = 'Spike',
  Hole = 'Hole',
}

export const BlockTypeDefinition = {
  type: RecsType.String,
  value: RecsType.String,
}

// Type definition for `p_dash::models::block::Block` struct
export interface Block {
  stage_id: string
  x: number
  y: number
  blocktype: BlockType
}
export const BlockDefinition = {
  stage_id: RecsType.String,
  x: RecsType.Number,
  y: RecsType.Number,
  blocktype: BlockTypeDefinition,
}

// Type definition for `pixelaw::core::models::registry::CoreActionsAddress` struct
export interface CoreActionsAddress {
  key: bigint
  value: bigint
}
export const CoreActionsAddressDefinition = {
  key: RecsType.BigInt,
  value: RecsType.BigInt,
}

// Type definition for `pixelaw::core::models::registry::Instruction` struct
export interface Instruction {
  system: bigint
  selector: bigint
  instruction: bigint
}
export const InstructionDefinition = {
  system: RecsType.BigInt,
  selector: RecsType.BigInt,
  instruction: RecsType.BigInt,
}

// Type definition for `pixelaw::core::models::permissions::Permission` struct
export interface Permission {
  app: boolean
  color: boolean
  owner: boolean
  text: boolean
  timestamp: boolean
  action: boolean
}
export const PermissionDefinition = {
  app: RecsType.Boolean,
  color: RecsType.Boolean,
  owner: RecsType.Boolean,
  text: RecsType.Boolean,
  timestamp: RecsType.Boolean,
  action: RecsType.Boolean,
}

// Type definition for `pixelaw::core::models::permissions::Permissions` struct
export interface Permissions {
  allowing_app: bigint
  allowed_app: bigint
  permission: Permission
}
export const PermissionsDefinition = {
  allowing_app: RecsType.BigInt,
  allowed_app: RecsType.BigInt,
  permission: PermissionDefinition,
}

// Type definition for `pixelaw::core::models::pixel::Pixel` struct
export interface Pixel {
  x: number
  y: number
  app: bigint
  color: number
  created_at: number
  updated_at: number
  timestamp: number
  owner: bigint
  text: bigint
  action: bigint
}
export const PixelDefinition = {
  x: RecsType.Number,
  y: RecsType.Number,
  app: RecsType.BigInt,
  color: RecsType.Number,
  created_at: RecsType.Number,
  updated_at: RecsType.Number,
  timestamp: RecsType.Number,
  owner: RecsType.BigInt,
  text: RecsType.BigInt,
  action: RecsType.BigInt,
}

export interface PixelUpdate {
  x: number
  y: number
  color?: number
  owner?: bigint
  app?: bigint
  text?: bigint
  timestamp?: number
  action?: bigint
}
export const PixelUpdateDefinition = {
  x: RecsType.Number,
  y: RecsType.Number,
  color: RecsType.OptionalNumber,
  owner: RecsType.OptionalBigInt,
  app: RecsType.OptionalBigInt,
  text: RecsType.OptionalBigInt,
  timestamp: RecsType.OptionalNumber,
  action: RecsType.OptionalBigInt,
}

// Type definition for `pixelaw::core::models::queue::QueueItem` struct
export interface QueueItem {
  id: bigint
  valid: boolean
}
export const QueueItemDefinition = {
  id: RecsType.BigInt,
  valid: RecsType.Boolean,
}

// Type definition for `p_dash::models::stage::Stage` struct
export interface Stage {
  id: bigint
  x: number
  y: number
  w: number
  h: number
  creator: bigint
}
export const StageDefinition = {
  id: RecsType.BigInt,
  x: RecsType.Number,
  y: RecsType.Number,
  w: RecsType.Number,
  h: RecsType.Number,
  creator: RecsType.BigInt,
}

// Type definition for `DefaultParameters` struct
export interface DefaultParameters {
  for_player: bigint
  for_system: bigint
  position: Position
  color: number
}

export const DefaultParametersDefinition = {
  for_player: RecsType.BigInt,
  for_system: RecsType.BigInt,
  position: PositionDefinition,
  color: RecsType.Number,
}

export function defineContractComponents(world: World) {
  return {
    // Model definition for `pixelaw::core::models::registry::App` model
    App: (() => {
      return defineComponent(
        world,
        {
          system: RecsType.BigInt,
          name: RecsType.BigInt,
          icon: RecsType.BigInt,
          action: RecsType.BigInt,
        },
        {
          metadata: {
            namespace: 'pixelaw',
            name: 'App',
            types: ['ContractAddress', 'felt252', 'felt252', 'felt252'],
            customTypes: [],
          },
        },
      )
    })(),

    // Model definition for `pixelaw::core::models::registry::AppName` model
    AppName: (() => {
      return defineComponent(
        world,
        {
          name: RecsType.BigInt,
          system: RecsType.BigInt,
        },
        {
          metadata: {
            namespace: 'pixelaw',
            name: 'AppName',
            types: ['felt252', 'ContractAddress'],
            customTypes: [],
          },
        },
      )
    })(),

    // Model definition for `pixelaw::core::models::registry::AppUser` model
    AppUser: (() => {
      return defineComponent(
        world,
        {
          system: RecsType.BigInt,
          player: RecsType.BigInt,
          action: RecsType.BigInt,
        },
        {
          metadata: {
            namespace: 'pixelaw',
            name: 'AppUser',
            types: ['ContractAddress', 'ContractAddress', 'felt252'],
            customTypes: [],
          },
        },
      )
    })(),

    // Model definition for `p_dash::models::block::Block` model
    Block: (() => {
      return defineComponent(
        world,
        {
          stage_id: RecsType.BigInt,
          x: RecsType.Number,
          y: RecsType.Number,
          blocktype: RecsType.String,
        },
        {
          metadata: {
            namespace: 'pixelaw',
            name: 'Block',
            types: ['felt252', 'u32', 'u32', 'BlockType'],
            customTypes: [],
          },
        },
      )
    })(),

    // Model definition for `pixelaw::core::models::registry::CoreActionsAddress` model
    CoreActionsAddress: (() => {
      return defineComponent(
        world,
        {
          key: RecsType.BigInt,
          value: RecsType.BigInt,
        },
        {
          metadata: {
            namespace: 'pixelaw',
            name: 'CoreActionsAddress',
            types: ['felt252', 'ContractAddress'],
            customTypes: [],
          },
        },
      )
    })(),

    // Model definition for `pixelaw::core::models::registry::Instruction` model
    Instruction: (() => {
      return defineComponent(
        world,
        {
          system: RecsType.BigInt,
          selector: RecsType.BigInt,
          instruction: RecsType.BigInt,
        },
        {
          metadata: {
            namespace: 'pixelaw',
            name: 'Instruction',
            types: ['ContractAddress', 'felt252', 'felt252'],
            customTypes: [],
          },
        },
      )
    })(),

    // Model definition for `pixelaw::core::models::permissions::Permissions` model
    Permissions: (() => {
      return defineComponent(
        world,
        {
          allowing_app: RecsType.BigInt,
          allowed_app: RecsType.BigInt,
          permission: PermissionDefinition,
        },
        {
          metadata: {
            namespace: 'pixelaw',
            name: 'Permissions',
            types: ['ContractAddress', 'ContractAddress'],
            customTypes: ['Permission'],
          },
        },
      )
    })(),

    // Model definition for `pixelaw::core::models::pixel::Pixel` model
    Pixel: (() => {
      return defineComponent(
        world,
        {
          x: RecsType.Number,
          y: RecsType.Number,
          app: RecsType.BigInt,
          color: RecsType.Number,
          created_at: RecsType.Number,
          updated_at: RecsType.Number,
          timestamp: RecsType.Number,
          owner: RecsType.BigInt,
          text: RecsType.BigInt,
          action: RecsType.BigInt,
        },
        {
          metadata: {
            namespace: 'pixelaw',
            name: 'Pixel',
            types: [
              'u32',
              'u32',
              'ContractAddress',
              'u32',
              'u64',
              'u64',
              'u64',
              'ContractAddress',
              'felt252',
              'felt252',
            ],
            customTypes: [],
          },
        },
      )
    })(),

    // Model definition for `pixelaw::core::models::queue::QueueItem` model
    QueueItem: (() => {
      return defineComponent(
        world,
        {
          id: RecsType.BigInt,
          valid: RecsType.Boolean,
        },
        {
          metadata: {
            namespace: 'pixelaw',
            name: 'QueueItem',
            types: ['felt252', 'bool'],
            customTypes: [],
          },
        },
      )
    })(),

    // Model definition for `p_dash::models::stage::Stage` model
    Stage: (() => {
      return defineComponent(
        world,
        {
          id: RecsType.BigInt,
          x: RecsType.Number,
          y: RecsType.Number,
          w: RecsType.Number,
          h: RecsType.Number,
          creator: RecsType.BigInt,
        },
        {
          metadata: {
            namespace: 'pixelaw',
            name: 'Stage',
            types: ['felt252', 'u32', 'u32', 'u32', 'u32', 'ContractAddress'],
            customTypes: [],
          },
        },
      )
    })(),
  }
}