import { type Account } from 'starknet'
import { dojoConfig } from '../../dojoConfig'
import { createBurner } from './createBurner'
import { setup } from './generated/setup'
import { world as recsWorld } from './world'

export type NetworkLayer = Awaited<ReturnType<typeof createNetworkLayer>>

export const createNetworkLayer = async () => {
  // setup world
  const setupWorld = await setup(dojoConfig)

  // create burner and init
  const { burnerManager } = await createBurner(dojoConfig)

  return {
    ...setupWorld,
    recsWorld,
    burnerManager,
    account: burnerManager.account as Account,
  }
}
