import React, {useRef, useEffect, useState} from 'react';
import {Bounds, Coordinate, PixelStore, Tileset} from "../../types.ts";
import {
    cellForPosition,
    getCellSize,
    applyWorldOffset,
    handlePixelChanges, areBoundsEqual
} from "../../utils.ts";
import {ZOOM_MAX, ZOOM_MIN, ZOOM_SCALEFACTOR, ZOOM_TILEMODE} from "./constants.ts";
import {drawPixels} from "./drawPixels.ts";
import {drawOutline} from "./drawOutline.ts";
import {drawTiles} from "./drawTiles.ts";
import {drawGrid} from "./drawGrid.ts";
import useDimensions from "../../hooks/useDimensions.ts";

interface ViewportProps {
    pixelStore: PixelStore;
    tileset: Tileset;
    zoom: number;
    center: Coordinate;
    setCenter: (newCenter: Coordinate) => void;
    setZoom: (newZoom: number) => void;
    onWorldviewChange: (newWorldview: Bounds) => void;
    onCellClick: (coordinate: Coordinate) => void;
    onCellHover: (coordinate: Coordinate | undefined) => void;
}

const Viewport: React.FC<ViewportProps> = (
    {
        zoom, setZoom,
        center, setCenter,
        onWorldviewChange,
        pixelStore,
        tileset,
        onCellClick,
        onCellHover
    }) => {

    //<editor-fold desc="State">

    const wrapperRef = useRef(null);
    const isLoaded = useRef<boolean>(false);

    const dimensions = useDimensions(wrapperRef);

    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const contextRef = useRef<CanvasRenderingContext2D | null>(null);
    const bufferCanvasRef = useRef<HTMLCanvasElement | null>(null);
    const bufferContextRef = useRef<CanvasRenderingContext2D | null>(null);

    const [pixelOffset, setPixelOffset] = useState<Coordinate>([0, 0]);
    const [dragStart, setDragStart] = useState<number>(0);
    const dragStartPoint = useRef<Coordinate | null>(null);
    const [lastDragPoint, setLastDragPoint] = useState<Coordinate>([0, 0]);
    const [worldOffset, setWorldOffset] = useState<Coordinate>([0, 0]);
    const [hoveredCell, setHoveredCell] = useState<Coordinate | undefined>(undefined);
    const [worldView, setWorldView] = useState<Bounds>([[0, 0], [0, 0]]);
    //</editor-fold>

    //<editor-fold desc="Rendering">

    useEffect(() => {
        if (isLoaded.current) return

        if (!canvasRef.current) return;

        // TODO maybe more error handling if canvas etc are not available
        contextRef.current = canvasRef.current.getContext('2d');

        if (!contextRef.current) return;

        if (!bufferCanvasRef.current) {
            bufferCanvasRef.current = document.createElement('canvas');
            bufferContextRef.current = bufferCanvasRef.current.getContext('2d');
        }

        // const wv = getWorldViewBounds()
        // setWorldView(wv)

        isLoaded.current = true


    }, [])

    // When worldview changes
    useEffect(() => {
        const newWorldview = getWorldViewBounds()
        if (!areBoundsEqual(newWorldview, worldView)) {
            setWorldView(getWorldViewBounds())
            onWorldviewChange(newWorldview)
        }
    }, [dimensions, zoom, worldOffset, pixelOffset]);


    // Render when in pixel mode
    useEffect(() => {

        if(!bufferContextRef.current) return

        if (zoom > ZOOM_TILEMODE) {
            prepareCanvas()

            drawGrid(bufferContextRef.current, zoom, pixelOffset, dimensions)

            // drawTiles(bufferContext, zoom, pixelOffset, dimensions, worldOffset, tileStore)

            drawPixels(bufferContextRef.current, zoom, pixelOffset, dimensions, worldOffset, hoveredCell, pixelStore.getPixel)

            drawOutline(bufferContextRef.current, dimensions)

            contextRef.current!.drawImage(bufferCanvasRef.current!, 0, 0);

        }


    }, [dimensions, zoom, pixelOffset, hoveredCell, pixelStore.refresh]);


    // Render when in Tile mode
    useEffect(() => {
        if (zoom <= ZOOM_TILEMODE && zoom > ZOOM_MIN) {
            prepareCanvas()

            drawTiles(bufferContextRef.current!, zoom, pixelOffset, dimensions, worldOffset, tileset)
            drawOutline(bufferContextRef.current!, dimensions)

            contextRef.current!.drawImage(bufferCanvasRef.current!, 0, 0);

        }
    }, [dimensions, zoom, pixelOffset, tileset]);
    //</editor-fold>

    //<editor-fold desc="Helpers">
    const prepareCanvas = () => {
        const [width, height] = dimensions

        // Set canvas
        canvasRef.current!.width = width;
        canvasRef.current!.height = height;
        contextRef.current!.imageSmoothingEnabled = false

        bufferContextRef.current!.canvas.width = width
        bufferContextRef.current!.canvas.height = height
        bufferContextRef.current!.imageSmoothingEnabled = false

        bufferContextRef.current!.clearRect(0, 0, width, height);

    }
    const calculateCenter = () => {
        const [width, height] = dimensions;
        // Calculate the viewport's center point in pixels
        const viewportCenter: Coordinate = [width / 2, height / 2];
        // Adjust by pixelOffset to get the center in "world" pixels
        const adjustedCenter: Coordinate = [
            viewportCenter[0] + pixelOffset[0],
            viewportCenter[1] + pixelOffset[1],
        ];
        // Convert to world coordinates (cells)
        const centerCell = cellForPosition(zoom, [0, 0], adjustedCenter);
        const worldCenterCell = applyWorldOffset(worldOffset, centerCell)
        return worldCenterCell;
    };

    function drag(lastDragPoint: Coordinate, mouse: Coordinate) {
        const cellWidth = getCellSize(zoom)

        const [newPixelOffset, newWorldOffset] = handlePixelChanges(
            [...pixelOffset],
            [...worldOffset],
            [
                lastDragPoint[0] - mouse[0],
                lastDragPoint[1] - mouse[1]
            ],
            cellWidth
        )

        setPixelOffset(newPixelOffset);
        setWorldOffset(newWorldOffset)
    }

    const getWorldViewBounds = (): Bounds => {
        const [width, height] = dimensions
        const topLeft = applyWorldOffset(worldOffset, [0, 0])
        const bottomRightCell = cellForPosition(zoom, pixelOffset, [width, height])
        const bottomRight = applyWorldOffset(worldOffset, bottomRightCell)
        return [topLeft, bottomRight]
    }

    //</editor-fold>

    //<editor-fold desc="Mouse Handlers">
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;


        const handleWheel = (e: WheelEvent) => {

            e.preventDefault();

            const rect = canvas.getBoundingClientRect();
            let newZoom = zoom;

            if (e.deltaY < 0 && zoom < ZOOM_MAX) { // Zoom in
                newZoom *= ZOOM_SCALEFACTOR;
            } else if (e.deltaY > 0 && zoom > ZOOM_MIN) { // Zoom out
                newZoom /= ZOOM_SCALEFACTOR;
            }

            // Ensure newZoom is within bounds
            newZoom = Math.round(Math.min(Math.max(newZoom, ZOOM_MIN), ZOOM_MAX))

            // Calculate the mouse position relative to the canvas
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;

            // Convert mouse position to cell coordinates at the current zoom level
            const mouseCellBeforeZoom = cellForPosition(zoom, pixelOffset, [mouseX, mouseY]);

            // Calculate expected mouse cell position after zoom to keep it under the same world point
            const mouseCellAfterZoom = cellForPosition(newZoom, pixelOffset, [mouseX, mouseY]);

            // Calculate the difference in cell positions due to zooming
            const cellDiffX = mouseCellAfterZoom[0] - mouseCellBeforeZoom[0];
            const cellDiffY = mouseCellAfterZoom[1] - mouseCellBeforeZoom[1];

            // Adjust the worldOffset by the difference in cell positions
            // This keeps the content under the mouse stationary by adjusting the world offset
            setWorldOffset((currentWorldOffset) => [
                currentWorldOffset[0] + cellDiffX,
                currentWorldOffset[1] + cellDiffY,
            ]);

            // Update state with new zoom and world offset
            setZoom(newZoom);
            setCenter(center)

        };

        canvas.addEventListener('wheel', handleWheel, {passive: false});

        // const newWorldview = getWorldViewBounds()
        // if (!areBoundsEqual(newWorldview, worldView)) {
        //     setWorldView(getWorldViewBounds())
        //     onWorldviewChange(newWorldview)
        // }

        return () => {
            canvas.removeEventListener('wheel', handleWheel);
        };
    }, [zoom]);

    const handleMouseDown = (e: React.MouseEvent) => {

        setDragStart(Date.now());
        setHoveredCell(undefined);
        dragStartPoint.current = [e.clientX, e.clientY] as Coordinate
        setLastDragPoint([e.clientX, e.clientY]);
    };

    const handleMouseMove = (e: React.MouseEvent) => {

        if (dragStart) {
            const mouse: Coordinate = [e.clientX, e.clientY]
            drag(lastDragPoint, mouse)

            setLastDragPoint(mouse);
        } else {

            if (zoom > ZOOM_TILEMODE) {
                const rect = e.currentTarget.getBoundingClientRect();

                const viewportCell = cellForPosition(zoom, pixelOffset, [
                    e.clientX - rect.left,
                    e.clientY - rect.top
                ])
                const hoveredWorldCell = applyWorldOffset(worldOffset, viewportCell)
                if (
                    (!hoveredCell && viewportCell) ||
                    hoveredCell && (hoveredCell[0] !== hoveredWorldCell[0] || hoveredCell[1] !== hoveredWorldCell[1])
                ) {

                    setHoveredCell(viewportCell);
                    onCellHover(hoveredWorldCell)
                }
            }
        }
    };


    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const handleMouseLeave = (_e: React.MouseEvent) => {

        setHoveredCell(undefined);
        onCellHover(undefined);
    }

    const handleMouseUp = (e: React.MouseEvent) => {

        let distance = 0

        // Ending dragging now
        if (dragStartPoint.current !== null) {
            const startPos = dragStartPoint.current;
            const endPos: Coordinate = [e.clientX, e.clientY];
            distance = Math.sqrt(Math.pow(endPos[0] - startPos[0], 2) + Math.pow(endPos[1] - startPos[1], 2));

        }

        const timeDiff = Date.now() - dragStart;

        // If we didnt really drag, its a click
        if (timeDiff < 500 && distance < 10) {
            const rect = e.currentTarget.getBoundingClientRect();
            const viewportCell = cellForPosition(zoom, pixelOffset, [e.clientX - rect.left, e.clientY - rect.top])
            const worldClicked = applyWorldOffset(worldOffset, viewportCell)
            onCellClick(worldClicked)
        }else{
            const mouse: Coordinate = [e.clientX, e.clientY]
            drag(lastDragPoint, mouse)
        }

        setCenter(calculateCenter())

        //
        // const newWorldview = getWorldViewBounds()
        // if (!areBoundsEqual(newWorldview, worldView)) {
        //     setWorldView(getWorldViewBounds())
        //     onWorldviewChange(newWorldview)
        // }

        setDragStart(0);
        dragStartPoint.current = null
    };

    //</editor-fold>

    //<editor-fold desc="Output">

    return (
        <div ref={wrapperRef} style={{width: '100%', height: '100%'}}>
            <canvas width={dimensions[0]} height={dimensions[1]}
                    ref={canvasRef}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseLeave}
            />
        </div>
    );
    //</editor-fold>

};

export default Viewport