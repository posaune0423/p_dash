import {useEffect, useState} from "react";
import {Bounds, UpdateService} from "../types.ts";

let socket: WebSocket | null = null;

type Message = {
    cmd: string, data: unknown | TileChangedMessage
}

type TileChangedMessage = {
    tileName: string, timestamp: number
}

export const useUpdateService = (url: string): UpdateService => {
    const [isReady, setIsReady] = useState(false)
    const [tileChanged, setTileChanged] = useState<TileChangedMessage | null>(null)

    useEffect(() => {
        if(!url) return
        if (!socket) {
            socket = new WebSocket(url);

            socket.onopen = () => {
                setIsReady(true);
                console.log("sopen", url)
            }

            socket.onclose = () => {
                setIsReady(false);
                // Reset the socket to null when it's closed to allow reconnection attempts
                socket = null;
            };

            socket.onmessage = (event) => {
                const msg: Message = JSON.parse(event.data);
                if (msg.cmd === "tileChanged") {
                    const tileChangedMsg = msg.data as TileChangedMessage;

                    setTileChanged(tileChangedMsg);
                } else {
                    console.log("Unrecognized message from ws: ", msg);
                }
            };
        }

        // Return a cleanup function that does not close the socket but cleans up if the component unmounts
        return () => {
            // Cleanup logic here if necessary, but avoid closing the WebSocket
        };
    }, [])

    const setBounds = (newBounds: Bounds) => {
        if (isReady && socket) {
            const message = JSON.stringify({cmd: "subscribe", data: {boundingBox: newBounds}})
            socket.send(message)
        }

    }


    // bind is needed to make sure `send` references correct `this`
    return {
        isReady,
        tileChanged,
        setBounds
    }
}