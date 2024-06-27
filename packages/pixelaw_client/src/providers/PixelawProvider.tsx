import { ReactNode, createContext, useCallback, useContext, useEffect, useState } from "react";
import { IPixelawGameData, setupPixelaw, TPixelLawError } from "@/dojo/setupPixelaw";
import { useSettingsStore } from "@/stores/SettingsStore.ts";
import { createDojoConfig } from "@dojoengine/core";

export type IPixelLawContext = {
    clientState: "worldSelect" | "loading" | "error" | "gameActive";
    error: TPixelLawError | string | null;
    gameData: IPixelawGameData | undefined;
};

export const PixelawContext = createContext<IPixelLawContext | null>(null);

// @dev createDojoConfig can only be called once, or we get a full hangup
let activeLoad = false;

export const PixelawProvider = ({ children }: { children: ReactNode }) => {
    const currentValue = useContext(PixelawContext);
    const [contextValues, setContextValues] = useState<IPixelLawContext | null>({
        clientState: "loading",
        error: null,
        gameData: undefined,
    });

    if (currentValue) throw new Error("DojoProvider can only be used once");

    const { config, configIsValid } = useSettingsStore((state) => {
        return {
            config: state.config,
            configIsValid: state.configIsValid,
            configError: state.configError,
        };
    });

    const setupDojo = useCallback(async () => {
        if (!config) {
            throw new Error("Missing valid Dojo config");
        }
        if (!config.masterAddress || !config.masterPrivateKey) {
            throw new Error("Missing master account, please set in settings");
        }
        if (activeLoad) return;
        activeLoad = true;
        try {
            const data = await setupPixelaw(createDojoConfig(config));
            setContextValues({
                clientState: "gameActive",
                error: null,
                gameData: data,
            });
            console.log("💡 PixelAW Provider", data);
            activeLoad = false;
        } catch (e) {
            setContextValues({
                clientState: "error",
                error: e as Error,
                gameData: undefined,
            });
            activeLoad = false;
        }
    }, [config, configIsValid, setContextValues]);

    useEffect(() => {
        if (configIsValid && config) {
            setupDojo();
        }
    }, [config, configIsValid, setupDojo, setContextValues]);

    return <PixelawContext.Provider value={contextValues}>{children}</PixelawContext.Provider>;
};

export const usePixelawProvider = (): IPixelLawContext => {
    const context = useContext(PixelawContext);
    if (!context) throw new Error("PixelLawProvider can only be used within a PixelLawProvider");
    return context;
};
