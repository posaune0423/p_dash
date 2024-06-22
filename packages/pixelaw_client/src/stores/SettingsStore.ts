import {create} from "zustand";
import {immer} from "zustand/middleware/immer";
import manifest from "@/dojo/manifest";
import {DojoConfig} from "@dojoengine/core";


interface PixelawConfig extends DojoConfig {
    serverUrl?: string;
}

interface DojoConfigResult {
    config: PixelawConfig;
    isSuccess: boolean;
    error: Error | string | undefined;
}

export interface ISettingsStore {
    config: PixelawConfig | undefined;
    configIsValid: boolean;
    configError?: Error | string | undefined;
    worldAddress?: string;

    setDojoConfig(data: Partial<PixelawConfig>): Promise<void>;
    setSettings(data: Partial<ISettingsStore>): void; // catch all
    setWorldAddress(address: string): Promise<void>;
}

export const defaultDojoConfig: PixelawConfig = {
    serverUrl: import.meta.env.SERVER_URL,
    relayUrl: import.meta.env.RELAY_URL,
    rpcUrl: import.meta.env.RPC_URL,
    toriiUrl: import.meta.env.TORII_URL,
    manifest: manifest(import.meta.env.WORLD_ADDRESS),
    masterAddress: import.meta.env.MASTER_ADDRESS,
    masterPrivateKey: import.meta.env.MASTER_PRIVATE_KEY,
    accountClassHash: import.meta.env.ACCOUNT_CLASS_HASH,
    feeTokenAddress: import.meta.env.FEETOKEN_ADDRESS,
};

const checkUrl = async (url: string) => {
    try {
        await fetch(url);
        return true;
    } catch (e) {
        throw new Error(`Invalid URL: ${url}`);
    }
};

const checkUrls = async (urls: string[]): Promise<boolean> => {
    try {
        const results = await Promise.all(urls.map(checkUrl));
        return results.every((result) => result);
    } catch (e) {
        throw e;
    }
};

const checkConfig = async (config: DojoConfig): Promise<DojoConfigResult> => {
    const result = {
        config,
        isSuccess: true,
        error: undefined,
    } as DojoConfigResult;
    await checkUrls([config.rpcUrl, config.toriiUrl]).catch((e) => {
        result.isSuccess = false;
        result.error = e;
        throw e;
    });
    return result;
};

const useSettingsStore = create<ISettingsStore>()(
    immer((set, get) => ({
        config: undefined,
        configIsValid: true,
        worldAddress:
            "0xfea84b178ab1dc982ef9e369246f8c4d53aea52ea7af08879911f436313e4e",
        setDojoConfig: async (data: Partial<PixelawConfig>) => {
            try {
                const newConfig = {
                    ...defaultDojoConfig,
                    ...get().config,
                    ...data,
                } as DojoConfig;
                await checkConfig(newConfig);
                set((state) => {
                    Object.assign(state, {config: newConfig, configIsValid: true});
                });
            } catch (e) {
                set((state) => {
                    state.config = undefined;
                    state.configIsValid = false;
                    state.configError = e as Error;
                });
                throw new Error(`Failed to set dojo config: ${e}`);
            }
        },
        setSettings: (data: Partial<ISettingsStore>) => {
            set((state) => {
                Object.assign(state, data);
            });
        },
        setWorldAddress: async (_address: string) => {
            console.warn("unimplemented");
            // TODO: update the world address
        },
    }))
);

const {getState: getSettingsStore} = useSettingsStore;
const setDojoConfig = getSettingsStore().setDojoConfig; // syntactic sugar

// uses the set function to validate the default config
setDojoConfig(defaultDojoConfig);

export {getSettingsStore, useSettingsStore, setDojoConfig};
