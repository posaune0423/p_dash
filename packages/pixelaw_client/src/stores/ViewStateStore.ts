import {useEffect, useRef} from "react";
import {create} from 'zustand';
import {useLocation} from 'react-router-dom';
import {Coordinate} from "@/webtools/types.ts";

// const ZOOM_PRESETS = {tile: 100, pixel: 2800}
const ZOOM_PRESETS = {tile: 100, pixel: 3400} // for p/war we cannot see anything with 2800(FIXME)
const DEFAULT_ZOOM = ZOOM_PRESETS.pixel
// const DEFAULT_CENTER: Coordinate = [4294967194, 0]
const DEFAULT_CENTER: Coordinate = [30, 30] // for p/war

interface AppState {
    selectedApp: string;
    center: Coordinate;
    zoom: number;
    color: string;
    hoveredCell?: Coordinate;
    clickedCell?: Coordinate;
    setSelectedApp: (appName: string) => void;
    setCenter: (center: Coordinate) => void;
    setZoom: (zoom: number) => void;
    setColor: (color: string) => void;
    setHoveredCell: (cell?: Coordinate) => void;
    setClickedCell: (cell?: Coordinate) => void;
}

export const useViewStateStore = create<AppState>((set) => ({
    selectedApp: '',
    center: DEFAULT_CENTER,
    zoom: DEFAULT_ZOOM,
    color: '000000',
    hoveredCell: undefined,
    clickedCell: undefined,
    setSelectedApp: (appName: string) => set({selectedApp: appName}),
    setCenter: (center: Coordinate) => set({center}),
    setZoom: (zoom: number) => set({zoom}),
    setColor: (color: string) => set({color: color}),
    setHoveredCell: (cell?: Coordinate) => set({hoveredCell: cell}),
    setClickedCell: (cell?: Coordinate) => set({clickedCell: cell}),
}));

export function useSyncedViewStateStore() {

    const location = useLocation();
    const {
        selectedApp,
        setSelectedApp,
        center,
        setCenter,
        zoom,
        setZoom,
        color,
        setColor
    } = useViewStateStore();

    const initialLoad = useRef(true);

    useEffect(() => {
        if (initialLoad.current) {
            initialLoad.current = false;
            const queryParams = new URLSearchParams(location.search);
            const appInQuery = queryParams.get('app');
            const centerInQuery = queryParams.get('center')?.split(',').map(Number) as Coordinate;
            const zoomInQuery = Number(queryParams.get('zoom'));
            const colorInQuery = queryParams.get('color');

            if (appInQuery && appInQuery.length > 0) setSelectedApp(appInQuery)
            if (centerInQuery) setCenter(centerInQuery);
            if (zoomInQuery) setZoom(zoomInQuery);
            if (colorInQuery) setColor(colorInQuery);

        }
    }, []);

    useEffect(() => {
        const updateURL = () => {
            const queryParams = new URLSearchParams();
            queryParams.set('app', selectedApp);
            queryParams.set('center', `${center[0]},${center[1]}`);
            queryParams.set('zoom', zoom.toString());
            queryParams.set('color', color);
            const newSearch = `?${queryParams.toString()}`;

            if (window.location.search !== newSearch) {
                window.history.replaceState(null, '', newSearch);
            }
        };
        updateURL();
    }, [selectedApp, center, zoom, color]);
}
