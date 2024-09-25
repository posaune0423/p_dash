/* eslint-disable @typescript-eslint/no-unused-vars -- for now */
import { defineSystem, type Entity, Has, type World } from '@dojoengine/recs'
import { getEntityIdFromKeys } from '@dojoengine/utils'
import { type Account } from 'starknet'
import { hash } from 'starknet'
import { type ClientComponents } from './createClientComponents'
import { type IWorld } from './typescript/contracts.gen'
import { BlockType } from './typescript/models.gen'
import { type Block } from '@/types'
import { getBlockColor, hexRGBAtoNumber } from '@/utils'

export type SystemCalls = ReturnType<typeof createSystemCalls>

export function createSystemCalls(
  { client }: { client: IWorld },
  clientComponents: ClientComponents,
  world: World,
) {
  const initializeStage = async (
    account: Account,
    x: number,
    y: number,
    width: number,
    height: number,
  ) => {
    const stageId = hash.computePedersenHashOnElements([account.address, x, y, width, height])

    try {
      await client.p_dash_actions.initialize_stage({
        account,
        stage_id: stageId,
        start_x: x,
        start_y: y,
        width,
        height,
        default_params: {
          for_player: BigInt(account.address),
          for_system: 0n,
          position: {
            x,
            y,
          },
          color: hexRGBAtoNumber(getBlockColor(BlockType.InitBlock)),
        },
      })

      // Wait for the indexer to update the entity
      // By doing this we keep the optimistic UI in sync with the actual state
      await new Promise<void>((resolve) => {
        defineSystem(world, [Has(clientComponents.Stage)], () => {
          resolve()
        })
      })

      return stageId
    } catch (e) {
      console.error(e)
      throw e
    }
  }

  const batchPutBlocks = async (account: Account, stageId: string, blocks: Block[]) => {
    try {
      const convertedBlocks = blocks.map((block) => ({
        stage_id: stageId,
        x: block.x,
        y: block.y,
        blocktype: block.type,
      }))
      await client.p_dash_actions.batch_put_blocks(account, stageId, convertedBlocks)

      // Wait for the indexer to update the entity
      // By doing this we keep the optimistic UI in sync with the actual state
      await new Promise<void>((resolve) => {
        defineSystem(world, [Has(clientComponents.Block)], () => {
          resolve()
        })
      })
    } catch (e) {
      console.error(e)
    }
  }

  return {
    initializeStage,
    batchPutBlocks,
  }
}
