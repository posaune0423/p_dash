import { RpcProvider } from "starknet";
import { felt252ToString } from "@/global/utils.ts";
import { ComponentValue } from "@dojoengine/recs";

export async function getAbi(provider: RpcProvider, app: ComponentValue) {
    let name = felt252ToString(app.name).toLowerCase();
    console.log("reloading abi for", name);
    const ch = await provider.getClassHashAt(app.system);
    const cl = await provider.getClass(ch);

    name = `pixelaw::apps::${name}::app::${name}_actions`;

    return {
        kind: "DojoContract",
        address: app.system,
        abi: cl.abi,
        name,
    };
}
