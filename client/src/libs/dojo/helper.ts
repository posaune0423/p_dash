import type { App, GameState, Pixel } from "@/types";
import { felt252ToString, felt252ToUnicode, hexToRgba } from "@/utils";
import type { ParsedEntity, QueryType, SDK, StandardizedQueryResult } from "@dojoengine/sdk";
import type { SchemaType } from "./typescript/models.gen";

export const getPixelComponentValue = (entity: ParsedEntity<SchemaType>): Pixel => {
  return {
    x: entity.models.pixelaw.Pixel?.x as number,
    y: entity.models.pixelaw.Pixel?.y as number,
    color: hexToRgba(entity.models.pixelaw.Pixel?.color as number),
  };
};

export const getAppComponentValue = (entity: ParsedEntity<SchemaType>): App => {
  return {
    system: entity.models.pixelaw.App?.system as string,
    name: felt252ToString(String(entity.models.pixelaw.App?.name)),
    icon: felt252ToUnicode(String(entity.models.pixelaw.App?.icon)),
    action: String(entity.models.pixelaw.App?.action),
  };
};

export const getPixelComponentFromEntities = (entities: StandardizedQueryResult<SchemaType>): Pixel[] => {
  return (
    entities.map((entity) => {
      return {
        x: entity.models.pixelaw.Pixel?.x ?? 0,
        y: entity.models.pixelaw.Pixel?.y ?? 0,
        color: hexToRgba(entity.models.pixelaw.Pixel?.color ?? 0),
      };
    }) ?? []
  );
};

export const getPixelEntities = async (
  sdk: SDK<SchemaType>,
  state: GameState<SchemaType>,
  {
    upperLeftX,
    upperLeftY,
    lowerRightX,
    lowerRightY,
  }: { upperLeftX: number; upperLeftY: number; lowerRightX: number; lowerRightY: number },
) => {
  const MAX_QUERY_SIZE = 10000;

  const query: QueryType<SchemaType> = {
    pixelaw: {
      Pixel: {
        $: {
          where: {
            And: [
              {
                x: {
                  $gte: upperLeftX,
                },
              },
              {
                x: {
                  $lte: lowerRightX,
                },
              },
              {
                y: {
                  $gte: upperLeftY,
                },
              },
              {
                y: {
                  $lte: lowerRightY,
                },
              },
            ],
          },
        },
      },
    },
  };

  const entities = await sdk.getEntities({
    query,
    callback: (resp) => {
      if (resp.error) {
        console.error("resp.error.message:", resp.error.message);
        return;
      }
      if (resp.data) {
        state.setEntities(resp.data);
      }
    },
    limit: MAX_QUERY_SIZE,
  });

  return entities;
};
