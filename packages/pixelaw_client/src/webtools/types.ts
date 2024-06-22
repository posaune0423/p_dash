export type Pixel = {
    action: string
    color: number | string
    owner: string
    text: string
    timestamp: number | string
    x: number
    y: number
}

export type App = {
    "system": string,
    "name": string,
    "manifest": string,
    "icon": string,
    "action": string,
    "entity": {
        "id": string
    }
}

export type Tile = HTMLImageElement

export type TileChangedMessage = {
    tileName: string, timestamp: number
}

export interface UpdateService {
    isReady: boolean
    tileChanged: TileChangedMessage | null
    setBounds: (newBounds: Bounds) => void
}

export interface PixelStore {
    refresh: () => void;
    prepare: (bounds: Bounds) => void;
    getPixel: (coordinate: Coordinate) => Pixel | undefined;
    setPixel: (key: string, pixel: Pixel) => void;
    setPixels: (pixels: { key: string, pixel: Pixel }[]) => void;
}

export interface AppStore {
    getByName: (name: string) => App | undefined;
    getAll: () => App[]
    prepare: () => void;
}

export interface TileStore {
    refresh: () => void;
    prepare: (bounds: Bounds) => void;
    fetchTile: (key: string) => void;
    // getTile: (key: string) => Tile | undefined | "";
    // setTile: (key: string, tile: Tile) => Promise<void>;
    setTiles: (tiles: { key: string, tile: Tile }[]) => Promise<void>;
    tileset: Tileset | null;
    cacheUpdated: number;
}

export interface Tileset {
    tileSize: number,
    scaleFactor: number,
    bounds: Bounds,
    tileRows: (Tile | undefined | "")[][]
}

export type Dimension = [width: number, height: number];
export type Coordinate = [number, number];
export type Bounds = [topLeft: Coordinate, bottomRight: Coordinate];

export const MAX_UINT32: number = 4_294_967_295

export const TILESIZE = 100

// TODO handle scalefactor 10 later
export const DEFAULT_SCALEFACTOR = 1
