/* eslint-disable @typescript-eslint/no-explicit-any */
import { type DojoConfig, DojoProvider } from '@dojoengine/core'
import { BurnerManager } from '@dojoengine/create-burner'
import { getSyncEvents, getSyncEntities } from '@dojoengine/state'
import { Account, type ArraySignatureType } from 'starknet'
import { createSystemCalls } from './createSystemCalls'
import { setupWorld } from './typescript/contracts.gen'
import { defineContractComponents } from './typescript/models.gen'
import { createClientComponents } from '@/libs/dojo/createClientComponents'
import { world } from '@/libs/dojo/world'
import init, { createClient } from '@/libs/torii-client/pkg'

export type SetupResult = Awaited<ReturnType<typeof setup>>

export async function setup({ ...config }: DojoConfig) {
  // torii client
  // NOTE: should wait for wasm initialization
  await init()
  const toriiClient = await createClient({
    rpcUrl: config.rpcUrl,
    toriiUrl: config.toriiUrl,
    relayUrl: config.relayUrl,
    worldAddress: config.manifest.world.address || '',
  })

  // create contract components
  const contractComponents = defineContractComponents(world)

  // create client components
  const clientComponents = createClientComponents({ contractComponents })

  // Sync all events
  const eventSync = await getSyncEvents(toriiClient, contractComponents as any, undefined, [])

  // Sync all entities
  const sync = getSyncEntities(toriiClient, contractComponents as any, [])

  // create dojo provider
  const dojoProvider = new DojoProvider(config.manifest, config.rpcUrl)

  // setup world
  const client = await setupWorld(dojoProvider)

  // create burner manager
  const burnerManager = new BurnerManager({
    masterAccount: new Account(
      {
        nodeUrl: config.rpcUrl,
      },
      config.masterAddress,
      config.masterPrivateKey,
    ),
    accountClassHash: config.accountClassHash,
    rpcProvider: dojoProvider.provider,
    feeTokenAddress: config.feeTokenAddress,
  })

  try {
    await burnerManager.init()
    if (burnerManager.list().length === 0) {
      await burnerManager.create()
    }
  } catch (e) {
    console.error(e)
  }

  return {
    client,
    clientComponents,
    contractComponents,
    systemCalls: createSystemCalls({ client }, clientComponents, world),
    publish: (typedData: string, signature: ArraySignatureType) => {
      toriiClient.publishMessage(typedData, signature)
    },
    config,
    dojoProvider,
    burnerManager,
    toriiClient,
    eventSync,
    sync,
  }
}
