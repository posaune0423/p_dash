/* eslint-disable @typescript-eslint/no-unused-vars */
import { type AccountInterface } from 'starknet'
import { type ClientComponents } from './createClientComponents'
import { type ContractComponents } from './generated/contractComponents'
import type { IWorld } from './generated/generated'

export type SystemCalls = ReturnType<typeof createSystemCalls>

export function createSystemCalls(
  { client }: { client: IWorld },
  contractComponents: ContractComponents,
  {
    Block,
    Stage,
    StageId,
    Snake,
    SnakeSegment,
    Permissions,
    Pixel,
    QueueItem,
    App,
    AppName,
    AppUser,
    CoreActionsAddress,
    Instruction,
  }: ClientComponents,
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

  return {
    spawn,
  }
}
