import {produce} from 'immer';
import {useState, useEffect, useRef} from 'react';
import {Bounds, DEFAULT_SCALEFACTOR, MAX_UINT32, Tile, Tileset, TILESIZE, TileStore} from "../types.ts";
import {set as setIdb, get as getIdb, keys} from 'idb-keyval';
import {areBoundsEqual, calculateTileBounds, getWrappedTileCoordinate, MAX_VIEW_SIZE} from "../utils.ts";

type State = { [key: string]: HTMLImageElement | undefined | "" };


export function useSimpleTileStore(baseUrl: string): TileStore {
    // const [state, setState] = useState<State>({});
    const tilesLoadedRef = useRef(false); // Add this line
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const fetchCounter = useRef(0);
    const tileset = useRef<Tileset | null>(null);
    const tileCache = useRef<State>({});
    const actualBounds = useRef<Bounds | null>(null);
    const inputBounds = useRef<Bounds | null>(null);
    const [cacheUpdated, setCacheUpdated] = useState<number>(Date.now());


    const fetchTile = (key: string) => {
        fetchCounter.current++

        fetchImage(`${baseUrl}/${key}.png`).then(async base64Img => {
            await setIdb(key, base64Img);

            // Cannot use immer here because it won't work with HTMLImageElement, which is a read-only type
            // setState(prevState => ({...prevState, [key]: img}));
            tileCache.current[key] = await loadImage(base64Img); // Cache the loaded image
            fetchCounter.current--
            console.log("setState to img")
            setCacheUpdated(Date.now())

        }).catch(e => {
            setIdb(key, "").then(() => {
                tileCache.current[key] = ""; // Cache the loaded image
                // console.log("setState to ''")
                fetchCounter.current--

            });
            setCacheUpdated(Date.now())
            console.info('Error loading image:', key, e);
        });
    }

    useEffect(() => {
        if (tilesLoadedRef.current) return

        async function loadFromIdb() {
            setIsLoading(true);
            const keysArray = await keys();
            const tilesObj: Record<string, Tile | undefined | ""> = {};
            // console.log("loading keys", keysArray.length)
            for (const key of keysArray) {
                if (typeof key === 'string') {
                    try {
                        const base64 = await getIdb(key)
                        if (base64.length == 0) {
                            tilesObj[key] = ""
                        } else {
                            tilesObj[key] = await loadImage(base64)
                        }

                    } catch (e) {
                        console.log("Error loading", key, e)
                    }
                }
            }
            tileCache.current = tilesObj
            tilesLoadedRef.current = true
            setCacheUpdated(Date.now())
            setIsLoading(false);
        }

        loadFromIdb()

    }, []);


    const prepare = (newBounds: Bounds): void => {
        // console.log("prepare", JSON.stringify(newBounds))
        if (!inputBounds.current || !areBoundsEqual(inputBounds.current, newBounds)) {
            inputBounds.current = newBounds
            const ab = calculateTileBounds(newBounds)

            if (!actualBounds.current || !areBoundsEqual(actualBounds.current, ab)) {
                actualBounds.current = ab
                refresh();
            }
        }
    };

    const refresh = (): void => {

        // if (fetchCounter.current > 0) {
        //     console.log("skipRender")
        //     return
        // }
        if (isLoading || !actualBounds.current) return

        const [[leftTileCoord, topTileCoord], [rightTileCoord, bottomTileCoord]] = actualBounds.current
        console.log("refresh", JSON.stringify(actualBounds.current))

        const tileRows = []

        function distance(begin: number, end: number): number {
            return end >= begin
                ? end - begin // not wrapping
                : MAX_UINT32 - begin + end // wrapping
        }

        const width = distance(leftTileCoord, rightTileCoord)
        const height = distance(topTileCoord, bottomTileCoord)

        const tileWorldSize = TILESIZE * DEFAULT_SCALEFACTOR

        for (let x = 0; x <= width; x += tileWorldSize) {
            const tileRow: (Tile | undefined | "")[] = []
            for (let y = 0; y <= height; y += tileWorldSize) {
                const tileX = getWrappedTileCoordinate(leftTileCoord, x, tileWorldSize);
                const tileY = getWrappedTileCoordinate(topTileCoord, y, tileWorldSize);
                tileRow.push(
                    getTile(`${DEFAULT_SCALEFACTOR}_${TILESIZE}_${tileX}_${tileY}`)
                )
            }
            tileRows.push(tileRow)
        }

        tileset.current = {
            tileSize: TILESIZE,
            bounds: actualBounds.current,
            scaleFactor: DEFAULT_SCALEFACTOR,
            tileRows
        }

        console.log("setTileset")
        setCacheUpdated(Date.now())
    }

    const getTile = (key: string): Tile | undefined | "" => {

        if (tileCache.current[key] === undefined) {

            tileCache.current[key] = ""; // Cache the loaded image
            console.log("setState to ''")

            fetchTile(key)

        }
        return tileCache.current[key];
    };

    // const setTile = async (key: string, tile: Tile | undefined): Promise<void> => {
    //     console.log("setTile")
    //     await setIdb(key, tile);
    //     setState({...state, [key]: tile});
    //
    //     fetchTile(key)
    //     console.log("setState to tile")
    //
    // };

    const setTiles = async (tiles: { key: string, tile: Tile }[]): Promise<void> => {
        // const newTiles = {...state};
        // for (const {key, tile} of tiles) {
        //     await setIdb(key, tile);
        //     newTiles[key] = tile;
        // }
        // setState(newTiles);
    };

    return {fetchTile, setTiles, tileset: tileset.current, prepare, refresh, cacheUpdated};
}


const loadImage = (base64: string): Promise<HTMLImageElement> => {

    console.log("loadImage")
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = base64;
    });
};

const fetchImage = async (src: string): Promise<string> => {
    const response = await fetch(src);

    const blob = await response.blob();
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
};
