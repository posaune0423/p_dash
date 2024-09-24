/* eslint-disable @typescript-eslint/no-unused-vars -- for now */
import { type Account, type AccountInterface } from 'starknet'
import { hash } from 'starknet'
import { type ClientComponents } from './createClientComponents'
import { type ContractComponents } from './generated/components'
import type { IWorld } from './generated/systems'
import { type Block } from '@/types'

export type SystemCalls = ReturnType<typeof createSystemCalls>

export function createSystemCalls(
  { client }: { client: IWorld },
  _contractComponents: ContractComponents,
  _clientComponents: ClientComponents,
) {
  const initializeStage = async (
    account: Account | AccountInterface,
    x: number,
    y: number,
    width: number,
    height: number,
  ) => {
    const stageId = hash.computePedersenHashOnElements([account.address, x, y, width, height])
    try {
      await client.actions.initializeStage(account, stageId, x, y, width, height)
      return stageId
    } catch (e) {
      console.error(e)
      throw e
    }
  }

  const batchPutBlocks = async (
    account: Account | AccountInterface,
    stageId: string,
    blocks: Block[],
  ) => {
    try {
      await client.actions.batchPutBlocks(account, stageId, blocks)
    } catch (e) {
      console.error(e)
    }
  }

  return {
    initializeStage,
    batchPutBlocks,
  }
}
