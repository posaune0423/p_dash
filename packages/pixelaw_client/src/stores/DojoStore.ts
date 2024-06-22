import {create} from 'zustand';
import {
    DojoConfig, KATANA_CLASS_HASH, KATANA_ETH_CONTRACT_ADDRESS,
    KATANA_PREFUNDED_ADDRESS, KATANA_PREFUNDED_PRIVATE_KEY,
    LOCAL_KATANA, LOCAL_RELAY, LOCAL_TORII
} from "@dojoengine/core";
import manifest from "@/dojo/manifest.ts";

import * as torii from "@dojoengine/torii-client";

import {Client} from "@dojoengine/torii-wasm";

interface ClientState {
    client?: Client;
    createClient: () => Promise<void>;
}

const defaultDojoConfig: DojoConfig = {
    relayUrl: import.meta.env.VITE_RELAY_URL || LOCAL_RELAY,
    rpcUrl: import.meta.env.VITE_RPC_URL || LOCAL_KATANA,
    toriiUrl: import.meta.env.VITE_TORII_URL || LOCAL_TORII,
    manifest: manifest(import.meta.env.VITE_WORLD_ADDRESS),
    masterAddress: import.meta.env.VITE_MASTER_ADDRESS || KATANA_PREFUNDED_ADDRESS,
    masterPrivateKey: import.meta.env.VITE_MASTER_PRIVATE_KEY || KATANA_PREFUNDED_PRIVATE_KEY,
    accountClassHash: import.meta.env.VITE_ACCOUNT_CLASS_HASH || KATANA_CLASS_HASH,
    feeTokenAddress: import.meta.env.VITE_FEETOKEN_ADDRESS || KATANA_ETH_CONTRACT_ADDRESS
};

const useDojoStore = create<DojoConfig & ClientState & {
    setUrls: (urls: Partial<Pick<DojoConfig, 'relayUrl' | 'rpcUrl' | 'toriiUrl'>>) => Promise<void>
}>((set, get) => ({
    ...defaultDojoConfig,
    client: undefined,
    setUrls: async (urls: Partial<Pick<DojoConfig, 'relayUrl' | 'rpcUrl' | 'toriiUrl'>>) => {
        const checks = await Promise.all(
            Object.entries(urls).map(async ([key, url]) => {
                try {
                    const response = await fetch(url as string);
                    if (!response.ok) throw new Error('Response not ok');
                    return [key, url];
                } catch {
                    console.warn(`URL for ${key} is not responding.`);
                    return [key, defaultDojoConfig[key as keyof DojoConfig]];
                }
            })
        );
        set(Object.fromEntries(checks));
    },
    createClient: async () => {
        const {rpcUrl, toriiUrl, manifest} = get();
        // Assuming async initialization logic for ToriiClient
        const client = await torii.createClient([], {
            rpcUrl,
            toriiUrl,
            worldAddress: manifest.world.address,
            relayUrl: '', // Assuming this needs to be dynamically set or fetched
        });
        set({client});
    },
}));

export default useDojoStore;
