import { ControllerConnector } from '@cartridge/connector'

import { getContractByName } from '@dojoengine/core'
import type { ControllerOptions } from '@cartridge/controller'
import { manifest } from '../dojo/config'

const contract = getContractByName(manifest, 'pixelaw', 'paint_actions')
if (!contract?.address) {
  throw new Error('pixelaw paint_actions contract not found')
}
const paint_action_contract_address = contract?.address

const policies = [
  {
    target: import.meta.env.VITE_PUBLIC_FEE_TOKEN_ADDRESS,
    method: 'approve',
  },
  {
    target: import.meta.env.VITE_PUBLIC_FEE_TOKEN_ADDRESS,
    method: 'transfer',
  },
  {
    target: import.meta.env.VITE_PUBLIC_FEE_TOKEN_ADDRESS,
    method: 'mint',
  },
  {
    target: import.meta.env.VITE_PUBLIC_FEE_TOKEN_ADDRESS,
    method: 'burn',
  },
  {
    target: import.meta.env.VITE_PUBLIC_FEE_TOKEN_ADDRESS,
    method: 'allowance',
  },
  // paint_actions
  {
    target: paint_action_contract_address,
    method: 'interact',
    description: 'Interact with the paint_actions contract',
  },
]

const options: ControllerOptions = {
  rpc: import.meta.env.VITE_PUBLIC_RPC_URL,
  policies,
}

const cartridgeConnector = new ControllerConnector(options)

export default cartridgeConnector
