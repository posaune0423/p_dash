import styles from "./App.module.css";
import { useEffect, useMemo, useState } from "react";
import { Bounds, Coordinate } from "@/webtools/types.ts";
import { useSimpleTileStore } from "@/webtools/hooks/SimpleTileStore.ts";
import { useDojoPixelStore } from "@/stores/DojoPixelStore.ts";
import { useUpdateService } from "@/webtools/hooks/UpdateService.ts";
import Viewport from "@/webtools/components/Viewport/ViewPort.tsx";
import SimpleColorPicker from "@/components/ColorPicker/SimpleColorPicker.tsx";
import MenuBar from "@/components/MenuBar/MenuBar.tsx";
import { Route, Routes } from "react-router-dom";
import Loading from "@/components/Loading/Loading.tsx";
import Settings from "@/components/Settings/Settings.tsx";
import { usePixelawProvider } from "@/providers/PixelawProvider.tsx";
import { useViewStateStore, useSyncedViewStateStore } from "@/stores/ViewStateStore.ts";
import { useDojoInteractHandler } from "@/hooks/useDojoInteractHandler.ts";
import { useSettingsStore } from "@/stores/SettingsStore.ts";
import { RiArrowGoBackFill } from "react-icons/ri";

function App() {
    const settings = useSettingsStore();
    const updateService = useUpdateService(`${settings.config?.serverUrl}/tiles`);
    const pixelStore = useDojoPixelStore(settings.config?.toriiUrl);
    const tileStore = useSimpleTileStore(`${settings.config?.serverUrl}/tiles`);
    const { clientState, error, gameData } = usePixelawProvider();
    const {
        color,
        setColor,
        center,
        setCenter,
        zoom,
        setZoom,
        setHoveredCell,
        setClickedCell,
        setSelectedApp, // added
    } = useViewStateStore();

    // FIXME: should be in the ViewStateStore??
    const [isColorPickerVisible, setIsColorPickerVisible] = useState(false);
    // const colorPickerRef = useRef<HTMLDivElement>(null);

    useDojoInteractHandler(pixelStore, gameData!);
    useSyncedViewStateStore();

    useEffect(() => {
        console.log("updateService.tileChanged", updateService.tileChanged);
        pixelStore.refresh();
        tileStore.fetchTile("");
    }, [updateService.tileChanged]);

    function onWorldviewChange(newWorldview: Bounds) {
        // console.log("onWorldviewChange", newWorldview)
        updateService.setBounds(newWorldview);
        pixelStore.prepare(newWorldview);
        tileStore.prepare(newWorldview);
    }

    function onCellHover(coordinate: Coordinate | undefined) {
        // TODO this is where we'll do some p2p social stuff
        setHoveredCell(coordinate);
    }

    function onCellClick(coordinate: Coordinate) {
        console.log("x: ", coordinate[0], "y: ", coordinate[1]);
        setClickedCell(coordinate);
    }

    function onColorSelect(color: string) {
        // remove the leading #
        color = color.replace("#", "");
        setColor(color);
    }

    function toggleColorPicker() {
        setIsColorPickerVisible((prevState) => !prevState);
    }

    // TODO "slide up" the bottom as the zoomlevel increases
    const zoombasedAdjustment = useMemo(() => {
        if (zoom > 3000) {
            return "1rem";
        }
        return "-100%";
    }, [zoom]);

    if (clientState === "loading") {
        document.title = "PixeLAW: Loading";
        return <Loading />;
    }

    if (clientState === "error") {
        document.title = "PixeLAW: Error";
        const errorMessage = `${error}`;
        return (
            <div className={styles.errorContainer}>
                <div className={styles.errorMessage}>
                    <h1 className={styles.errorTitle}>Something went wrong</h1>
                    {errorMessage !== "" && <p className={styles.errorDetail}>{errorMessage}</p>}
                    <p className={styles.errorSuggestion}>
                        Try to refresh this page. If issue still persists, alert the team at Discord.
                    </p>
                </div>
            </div>
        );
    }

    document.title = "PixeLAW: World";

    return (
        // <div className={styles.container}>
        <div className="bg-bg-primary min-h-screen flex flex-col">
            <MenuBar />

            <div className={styles.main}>
                <Routes>
                    <Route path="/settings" element={<Settings />} />
                    <Route
                        path="/"
                        element={
                            <>
                                <Viewport
                                    tileset={tileStore.tileset!}
                                    pixelStore={pixelStore}
                                    zoom={zoom}
                                    setZoom={setZoom}
                                    center={center}
                                    setCenter={setCenter}
                                    onWorldviewChange={onWorldviewChange}
                                    onCellClick={onCellClick}
                                    onCellHover={onCellHover}
                                />

                                <div
                                    className={styles.colorpicker}
                                    style={{
                                        bottom: zoombasedAdjustment,
                                        display: isColorPickerVisible ? "flex" : "none",
                                    }}
                                >
                                    <SimpleColorPicker color={color} onColorSelect={onColorSelect} />
                                    <button className={styles.closeButton} onClick={toggleColorPicker}>
                                        <RiArrowGoBackFill size={22} />
                                    </button>
                                </div>

                                <div className={styles.buttonContainer}>
                                    <button
                                        className={styles.placePixelButton}
                                        onClick={() => {
                                            toggleColorPicker();
                                            setSelectedApp("p_dash");
                                        }}
                                        style={{ display: isColorPickerVisible ? "none" : "flex" }}
                                    >
                                        Place a Object
                                    </button>
                                </div>
                            </>
                        }
                    />
                </Routes>
            </div>
        </div>
    );
}

export default App;
