import { getSyncEntities } from "@dojoengine/state";
import { DojoConfig, DojoProvider } from "@dojoengine/core";
import * as torii from "@dojoengine/torii-client";
import { createSystemCalls } from "./createSystemCalls";
import { defineContractComponents } from "./contractComponents";
import { world } from "./world";
import { setupWorld } from "./generated";
import {
    Account,
    // RpcProvider
} from "starknet";
import { BurnerManager, useBurnerManager } from "@dojoengine/create-burner";
import { getSdk } from "../generated/graphql";
import { GraphQLClient } from "graphql-request";
import {
    // ComponentValue,
    getComponentEntities,
    getComponentValue,
} from "@dojoengine/recs";
// import { felt252ToString } from "../global/utils";
import { Manifest } from "../global/types.ts";

export type TPixelLawError = Error & {
    type?: "DojoStateError" | "ConfigError";
};

export type SetupResult = {
    apps: ReturnType<typeof getComponentValue>[];
    client: Awaited<ReturnType<typeof setupWorld>>;
    contractComponents: ReturnType<typeof defineContractComponents>;
    graphSdk: ReturnType<typeof getSdk>;
    systemCalls: ReturnType<typeof createSystemCalls>;
    config: DojoConfig;
    dojoProvider: DojoProvider;
    manifest: Manifest;
    burnerManager: BurnerManager;
    masterAccount: Account;
    account: Account | null;
};

export interface IPixelawGameData {
    setup: SetupResult;
    dojoProvider: DojoProvider;
    masterAccount: Account;
    account: ReturnType<typeof useBurnerManager>;
}

// async function getAbi(provider: RpcProvider, app: ComponentValue) {
//     let name = felt252ToString(app.name).toLowerCase();
//     console.log("reloading abi for", name);
//     const ch = await provider.getClassHashAt(app.system);
//     const cl = await provider.getClass(ch);

//     name = `pixelaw::apps::${name}::app::${name}_actions`;

//     return {
//         kind: "DojoContract",
//         address: app.system,
//         abi: cl.abi,
//         name,
//     };
// }

export async function setupPixelaw({ ...config }: DojoConfig): Promise<IPixelawGameData> {
    console.group("🏵️ Setting up Dojo 🔨");
    console.log("⚙️ Config:", config);
    console.log("torii.createClient", config.manifest.world.address);

    // torii client
    const toriiClient = await torii.createClient({
        rpcUrl: config.rpcUrl,
        toriiUrl: config.toriiUrl,
        worldAddress: config.manifest.world.address || "",
        relayUrl: "",
    });

    const contractComponents = defineContractComponents(world);
    // const clientComponents = createClientComponents({contractComponents});

    // FIXME: this is throwing failed to get entities: Missing expected data
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await getSyncEntities(toriiClient, contractComponents as any, []);

    // Get apps from the world
    const entities = getComponentEntities(contractComponents.App);

    const apps: ReturnType<typeof getComponentValue>[] = [...entities].map((entityId) =>
        getComponentValue(contractComponents.App, entityId)
    );

    // const contracts = await Promise.all(apps.map((app) => getAbi(new RpcProvider({ nodeUrl: config!.rpcUrl }), app!)));

    // Manifest with updated contract ABIs
    const manifest = {
        ...config.manifest,
        // contracts,
    };

    // Create Dojo Provider
    const dojoProvider = new DojoProvider(manifest, config.rpcUrl);
    const client = await setupWorld(dojoProvider);

    // Create burner manager
    const burnerManager = new BurnerManager({
        masterAccount: new Account(dojoProvider.provider, config.masterAddress, config.masterPrivateKey),
        accountClassHash: config.accountClassHash,
        rpcProvider: dojoProvider.provider,
        feeTokenAddress: config.feeTokenAddress,
    });

    await burnerManager.init();
    if (burnerManager.list().length === 0) {
        try {
            await burnerManager.create();
            console.log("burner done");
        } catch (e) {
            console.error(e);
        }
    }

    const masterAccount = new Account(dojoProvider.provider, config.masterAddress, config.masterPrivateKey, "1");
    const { create, list, get, select, clear, account, isDeploying } = burnerManager;

    // Create Graph SDK
    const createGraphSdk = () => getSdk(new GraphQLClient(`${config.toriiUrl}/graphql`));

    // Wrap up
    console.groupEnd();

    // Create setup data
    const setupData = {
        apps,
        client,
        contractComponents,
        graphSdk: createGraphSdk(),
        systemCalls: createSystemCalls({ client }),
        config,
        manifest,
        dojoProvider,
        burnerManager,
        masterAccount,
        account,
    } as SetupResult;

    return {
        setup: setupData,
        dojoProvider,
        masterAccount,
        account: {
            create,
            list,
            get,
            select,
            clear,
            account: account ? account : masterAccount,
            isDeploying,
        },
    } as IPixelawGameData;
}
