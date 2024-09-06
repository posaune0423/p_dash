import { type Entities, type ToriiClient } from '@dojoengine/torii-client'
import { hexToRgba } from '@/utils'

export const getPixelComponentFromEntities = (entities: Entities) => {
  return Object.values(entities).map((entity) => ({
    x: entity['pixelaw-Pixel'].x.value as number,
    y: entity['pixelaw-Pixel'].y.value as number,
    color: hexToRgba(entity['pixelaw-Pixel'].color.value as number),
  }))
}

export const getPixelEntities = async (
  client: ToriiClient,
  limit: number,
  {
    upperLeftX,
    upperLeftY,
    lowerRightX,
    lowerRightY,
  }: { upperLeftX: number; upperLeftY: number; lowerRightX: number; lowerRightY: number },
) => {
  const entities = await client.getEntities({
    limit,
    offset: 0,
    clause: {
      Composite: {
        operator: 'And',
        clauses: [
          {
            Member: {
              model: 'pixelaw-Pixel',
              member: 'x',
              operator: 'Gte',
              value: { U32: upperLeftX },
            },
          },
          {
            Member: {
              model: 'pixelaw-Pixel',
              member: 'y',
              operator: 'Gte',
              value: { U32: upperLeftY },
            },
          },
          {
            Member: {
              model: 'pixelaw-Pixel',
              member: 'x',
              operator: 'Lte',
              value: { U32: lowerRightX },
            },
          },
          {
            Member: {
              model: 'pixelaw-Pixel',
              member: 'y',
              operator: 'Lte',
              value: { U32: lowerRightY },
            },
          },
        ],
      },
    },
  })

  return entities
}
