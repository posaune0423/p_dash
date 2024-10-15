import CartridgeConnector from "@cartridge/connector";
import { type ControllerOptions } from "@cartridge/controller";
import { getContractByName } from "@dojoengine/core";
import { type Connector } from "@starknet-react/core";
import { shortString } from "starknet";
import { manifest } from "../../dojoConfig";
import { env } from "@/env";

const contract = getContractByName(manifest, "pixelaw", "p_dash_actions");
if (!contract?.address) {
  throw new Error("pixelaw paint_actions contract not found");
}
const paint_action_contract_address = contract?.address;

const policies = [
  {
    target: env.NEXT_PUBLIC_FEE_TOKEN_ADDRESS,
    method: "approve",
  },
  // paint_actions
  {
    target: paint_action_contract_address,
    method: "interact",
    description: "Interact with the paint_actions contract",
  },
];

const options: ControllerOptions = {
  rpc: env.NEXT_PUBLIC_RPC_URL,
  indexerUrl: env.NEXT_PUBLIC_TORII_URL,
  policies,
  paymaster: {
    caller: shortString.encodeShortString("ANY_CALLER"),
  },
  // theme: "dope-wars",
  // colorMode: "light"
};

const cartridgeConnector = new CartridgeConnector(options) as never as Connector;

export default cartridgeConnector;
