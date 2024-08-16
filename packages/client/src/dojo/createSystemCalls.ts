/* eslint-disable @typescript-eslint/no-unused-vars -- for now */
import { type AccountInterface } from 'starknet'
import { type ClientComponents } from './createClientComponents'
import { type ContractComponents } from './generated/contractComponents'
import type { IWorld, PixelUpdate } from './generated/generated'

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
  const init = async (account: AccountInterface) => {
    try {
      await client.actions.init({
        account,
      })
    } catch (e) {
      console.error(e)
    }
  }

  const updatePixel = async (
    account: AccountInterface,
    forPlayer: `0x${string}`,
    forSystem: `0x${string}`,
    pixelUpdate: PixelUpdate,
  ) => {
    try {
      await client.actions.updatePixel({
        account,
        forPlayer,
        forSystem,
        pixelUpdate,
      })
    } catch (e) {
      console.error(e)
    }
  }

  return {
    init,
    updatePixel,
  }
}
