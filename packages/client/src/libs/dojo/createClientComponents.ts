import { overridableComponent } from '@dojoengine/recs'
import { type ContractComponents } from './typescript/models.gen'

export type ClientComponents = ReturnType<typeof createClientComponents>

export function createClientComponents({
  contractComponents,
}: {
  contractComponents: ContractComponents
}) {
  return {
    ...contractComponents,
    Stage: overridableComponent(contractComponents.Stage),
    Block: overridableComponent(contractComponents.Block),
    // App: overridableComponent(contractComponents.App),
    // AppName: overridableComponent(contractComponents.AppName),
    // Pixel: overridableComponent(contractComponents.Pixel),
    // Permissions: overridableComponent(contractComponents.Permissions),
    // Instruction: overridableComponent(contractComponents.Instruction),
    // CoreActionsAddress: overridableComponent(contractComponents.CoreActionsAddress),
  }
}
