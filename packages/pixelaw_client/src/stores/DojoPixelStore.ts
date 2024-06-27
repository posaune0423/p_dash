import { useState } from "react";
import { Bounds, Coordinate, MAX_UINT32, Pixel, PixelStore } from "@/webtools/types.ts";
import { produce } from "immer";
import GET_PIXELS_QUERY from "@/../graphql/GetPixels.graphql";
import { GraphQLClient } from "graphql-request";
import { areBoundsEqual, MAX_VIEW_SIZE } from "@/webtools/utils.ts";
import { shortString } from "starknet";

// TODO local declaration to deal with typing. Should come from World__Query but thats very generic
type GetPixelsResponse = {
    pixelModels: {
        edges: Array<{
            node: Pixel;
        }>;
    };
};

type State = { [key: string]: Pixel | undefined };

export function useDojoPixelStore(baseUrl?: string): PixelStore {
    const [state, setState] = useState<State>({});
    const [bounds, setBounds] = useState<Bounds>([
        [0, 0],
        [MAX_VIEW_SIZE, MAX_VIEW_SIZE],
    ]);

    const gqlClient = baseUrl ? new GraphQLClient(`${baseUrl}/graphql`) : null;

    function fetchData(bounds: Bounds): void {
        if (!gqlClient) return;

        // eslint-disable-next-line prefer-const
        let [[left, top], [right, bottom]] = bounds;

        if (left > MAX_VIEW_SIZE && left > right) right = MAX_UINT32;
        if (top > MAX_VIEW_SIZE && top > bottom) bottom = MAX_UINT32;

        gqlClient
            .request<GetPixelsResponse>(GET_PIXELS_QUERY, {
                first: 50000,
                where: {
                    xGTE: left,
                    xLTE: right,
                    yGTE: top,
                    yLTE: bottom,
                },
            })
            .then((data) => {
                data!.pixelModels!.edges!.map(({ node }: { node: Pixel }) => {
                    const pixel: Pixel = {
                        ...node,
                        text: shortString.decodeShortString(node.text),
                        action: shortString.decodeShortString(node.action),
                        timestamp: parseInt(node.timestamp as string, 16),
                    };

                    setState(
                        produce((draftState) => {
                            draftState[`${node.x}_${node.y}`] = pixel;
                        })
                    );
                });
            })
            .catch((e) => {
                console.error("Error retrieving pixels from torii for", bounds, e.message);
            });
    }

    const refresh = (): void => {
        const [[left, top], [right, bottom]] = bounds;
        const xWraps = right - left < 0;
        const yWraps = bottom - top < 0;

        if (xWraps && yWraps) {
            fetchData([
                [left, top],
                [0, 0],
            ]);
            fetchData([
                [left, 0],
                [0, bottom],
            ]);
            fetchData([
                [0, top],
                [right, 0],
            ]);
            fetchData([
                [0, 0],
                [right, bottom],
            ]);
        } else if (xWraps) {
            fetchData([
                [left, top],
                [0, bottom],
            ]);
            fetchData([
                [0, top],
                [right, bottom],
            ]);
        } else if (yWraps) {
            fetchData([
                [left, top],
                [right, 0],
            ]);
            fetchData([
                [left, 0],
                [right, bottom],
            ]);
        } else {
            fetchData([
                [left, top],
                [right, bottom],
            ]);
        }
    };

    const prepare = (newBounds: Bounds): void => {
        if (!areBoundsEqual(bounds, newBounds)) {
            setBounds(newBounds);
            refresh();
        }
    };

    const getPixel = (coord: Coordinate): Pixel | undefined => {
        const key = `${coord[0]}_${coord[1]}`;

        return state[key];
    };

    const setPixel = (key: string, pixel: Pixel): void => {
        setState(
            produce((draft) => {
                draft[key] = pixel;
            })
        );
    };

    const setPixels = (pixels: { key: string; pixel: Pixel }[]): void => {
        setState(
            produce((draft) => {
                pixels.forEach(({ key, pixel }) => {
                    draft[key] = pixel;
                });
            })
        );
    };

    return { getPixel, setPixel, setPixels, prepare, refresh };
}
