/* eslint-disable @typescript-eslint/no-unused-vars */
import { type AccountInterface } from 'starknet'
import { type ClientComponents } from './createClientComponents'
import { type ContractComponents } from './generated/contractComponents'
import type { IWorld } from './generated/generated'
import { type Direction } from './utils'

export type SystemCalls = ReturnType<typeof createSystemCalls>

export function createSystemCalls(
  { client }: { client: IWorld },
  contractComponents: ContractComponents,
  { Position, Moves }: ClientComponents,
) {
  const spawn = async (account: AccountInterface) => {
    try {
      await client.actions.spawn({
        account,
      })
    } catch (e) {
      console.log(e)
    }
  }

  const move = async (account: AccountInterface, direction: Direction) => {
    try {
      await client.actions.move({
        account,
        direction,
      })
    } catch (e) {
      console.log(e)
    }
  }

  return {
    spawn,
    move,
  }
}
