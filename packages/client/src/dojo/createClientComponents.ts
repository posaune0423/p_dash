import { overridableComponent } from '@dojoengine/recs'
import { type ContractComponents } from './generated/contractComponents'

export type ClientComponents = ReturnType<typeof createClientComponents>

export function createClientComponents({
  contractComponents,
}: {
  contractComponents: ContractComponents
}) {
  return {
    ...contractComponents,
    Block: overridableComponent(contractComponents.Block),
    Stage: overridableComponent(contractComponents.Stage),
    StageId: overridableComponent(contractComponents.StageId),
    Snake: overridableComponent(contractComponents.Snake),
    SnakeSegment: overridableComponent(contractComponents.SnakeSegment),
    Permissions: overridableComponent(contractComponents.Permissions),
  }
}
