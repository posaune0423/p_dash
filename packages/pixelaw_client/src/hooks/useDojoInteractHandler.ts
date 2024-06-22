import {useEffect} from 'react';
import {useViewStateStore} from '@/stores/ViewStateStore.ts';
import {useDojoAppStore} from "@/stores/DojoAppStore.ts";
import {PixelStore} from "@/webtools/types.ts";
import {IPixelawGameData} from "@/dojo/setupPixelaw.ts";
import getParamsDef from "@/dojo/utils/paramsDef.ts";
import {coordinateToPosition, hexRGBtoNumber} from "@/global/utils.ts";
import {DojoCall} from "@dojoengine/core";
import {Manifest, Position} from "@/global/types.ts";
import {generateDojoCall} from "@/dojo/utils/call.ts";

// TODO maybe cleaner to directly use the Dojo hook here, but its not working.
// For now passing the pixelStore
export const useDojoInteractHandler = (pixelStore: PixelStore, gameData: IPixelawGameData) => {
    const {setClickedCell, clickedCell, selectedApp, color} = useViewStateStore();
    const {getByName} = useDojoAppStore()


    useEffect(() => {
        if (!clickedCell || !selectedApp) return;

        console.log(`Clicked cell ${clickedCell} with app: ${selectedApp}`);

        // Retrieve info of the pixel
        const pixel = pixelStore.getPixel(clickedCell);

        // If the pixel is not set, or the action is not overridden, use the default "interact"
        const action = pixel && pixel.action !== "0"
            ? pixel.action
            : "interact"

        const contractName = `${selectedApp}_actions`
        const position = coordinateToPosition(clickedCell)

        const params = getParamsDef(
            gameData.setup.manifest,
            contractName,
            action,
            position,
            false
        )

        if (params.length) {
            // User needs to choose parameters first
            // TODO lets first make the scenario without params work (paint)
        }

        // Generate the DojoCall
        const dojoCall: DojoCall = generateDojoCall(
            params,
            gameData.setup.manifest,
            contractName,
            action,
            coordinateToPosition(clickedCell),
            hexRGBtoNumber(color),
        )

        // Execute the call
        gameData.dojoProvider.execute(gameData.account.account!, dojoCall)
            .then(res => {
                console.log("dojocall", res)
                // Do something with the UI?
            })
        setClickedCell(undefined)
    }, [setClickedCell, clickedCell]);
};
