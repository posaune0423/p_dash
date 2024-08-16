import type { IPixelawGameData } from "@/dojo/setupPixelaw";
import { generateDojoCall } from "@/dojo/utils/call";
import getParamsDef from "@/dojo/utils/paramsDef";
// import { NAMESPACE } from "@/global/constants";
import { coordinateToPosition, hexRGBtoNumber } from "@/global/utils";
import { useViewStateStore } from "@/stores/ViewStateStore";
import type { PixelStore } from "@/webtools/types";
import type { DojoCall } from "@dojoengine/core";
import { useEffect, useState } from "react";

export const useDojoInteractHandler = (pixelStore: PixelStore, gameData: IPixelawGameData) => {
    const { setClickedCell, clickedCell, selectedApp, color } = useViewStateStore();
    const [paramData, setParamData] = useState(null);

    useEffect(() => {
        if (!clickedCell || !selectedApp) return;

        console.log(`Clicked cell ${clickedCell} with app: ${selectedApp}`);

        // Retrieve info of the pixel
        const pixel = pixelStore.getPixel(clickedCell);

        // If the pixel is not set, or the action is not overridden, use the default "interact"
        const action = pixel && pixel.action !== "0" ? pixel.action : "interact";

        const contractName = "actions";
        const position = coordinateToPosition(clickedCell);

        const params = getParamsDef(gameData.setup.manifest, contractName, action, position, false);

        // Generate the DojoCall
        const dojoCall: DojoCall = generateDojoCall(
            params,
            gameData.setup.manifest,
            contractName,
            action,
            coordinateToPosition(clickedCell),
            hexRGBtoNumber(color)
        );

        // Execute the call
        gameData.dojoProvider
            .execute(gameData.account.account!, dojoCall, "p_dash")
            .then((res) => {
                console.log("dojocall", res);

                // Reset paramData after execution
                setParamData(null);
            })
            .catch((e) => {
                console.error(e);
            });

        setClickedCell(undefined);
    }, [setClickedCell, clickedCell, paramData]);
};
