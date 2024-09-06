/* eslint-disable @typescript-eslint/no-unused-vars -- for now */
import { type Account, type AccountInterface } from "starknet";
import { type ClientComponents } from "./createClientComponents";
import { type ContractComponents } from "./generated/contractComponents";
import type { DefaultParams, IWorld, PixelUpdate } from "./generated/generated";

export type SystemCalls = ReturnType<typeof createSystemCalls>;

export function createSystemCalls(
  { client }: { client: IWorld },
  _contractComponents: ContractComponents,
  _clientComponents: ClientComponents
) {
  const initCore = async (account: Account | AccountInterface) => {
    try {
      await client.actions.initCore({
        account,
      });
    } catch (e) {
      console.error(e);
    }
  };

  const updatePixel = async (account: Account | AccountInterface, pixelUpdate: PixelUpdate) => {
    try {
      await client.actions.updatePixel(account, pixelUpdate);
    } catch (e) {
      console.error(e);
    }
  };

  const initPaint = async (account: Account | AccountInterface) => {
    try {
      await client.actions.initPaint(account);
    } catch (e) {
      console.error(e);
    }
  };

  const interact = async (account: Account | AccountInterface, params: Pick<DefaultParams, "x" | "y" | "color">) => {
    console.log("interact", params);
    try {
      await client.actions.interact(account, { ...params });
    } catch (e) {
      console.error(e);
    }
  };

  return {
    initCore,
    updatePixel,
    initPaint,
    interact,
  };
}
