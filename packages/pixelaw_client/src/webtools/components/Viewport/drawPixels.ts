import {Coordinate, Dimension, Pixel} from "../../types.ts";
import {getCellSize, numRGBAToHex, applyWorldOffset} from "../../utils.ts";
import {ZOOM_TILEMODE} from "./constants.ts";

export function drawPixels(
    context: CanvasRenderingContext2D,
    zoom: number,
    pixelOffset: Coordinate,
    dimensions: Dimension,
    worldTranslation: Coordinate,
    hoveredCell: Coordinate | undefined,
    getPixel: (coord: Coordinate) => Pixel | undefined
) {
    const cellSize = getCellSize(zoom);
    const gridDimensions = [
        Math.ceil(dimensions[0] / cellSize),
        Math.ceil(dimensions[1] / cellSize)
    ];
    context.beginPath();
    const doBorder = zoom <= ZOOM_TILEMODE ? 1 : 0;

    // How many pixels a cell extends offscreen
    const offsets: Coordinate = [
        0 - pixelOffset[0],
        0 - pixelOffset[1]
    ]

    const drawPixel = (cellX: number, cellY: number, sizeAdjustment: number = 0) => {

        const worldCoords = applyWorldOffset(worldTranslation, [cellX, cellY])

        const pixel = getPixel(worldCoords);
        if (!pixel) return;

        // FIXME: Shows a different color from original web_client.
        context.fillStyle = numRGBAToHex(pixel.color);

        const [x, y, w, h] = getRect(offsets, cellX, cellY, cellSize, doBorder, sizeAdjustment)

        context.fillRect(x, y, w, h);
    };

    // const worldCoords = viewToWorld(worldTranslation, [0, 0])

    // console.log(
    //     "offsets", offsets[0],
    //     "pixelOffset", pixelOffset[0],
    //     "wt", worldTranslation[0]
    // )

    for (let x = 0; x <= gridDimensions[0]; x++) {
        for (let y = 0; y <= gridDimensions[1]; y++) {
            drawPixel(x, y);
        }
    }


    if (hoveredCell && zoom > ZOOM_TILEMODE) {
        drawPixel(hoveredCell[0], hoveredCell[1], 15);
    }
}

function getRect(
    [offsetX, offsetY]: Coordinate,
    x: number,
    y: number,
    cellSize: number,
    doBorder: number,
    sizeAdjustment: number
): number[] {
    const startDrawingAtX = offsetX + (x * cellSize);
    const startDrawingAtY = offsetY + (y * cellSize);

    return [
        startDrawingAtX + doBorder - sizeAdjustment,
        startDrawingAtY + doBorder - sizeAdjustment,
        cellSize - doBorder + sizeAdjustment * 2,
        cellSize - doBorder + sizeAdjustment * 2
    ]

}


if (import.meta.vitest) {
    const {it, expect, describe} = import.meta.vitest


    describe('getRect', () => {
        it('should return correct rectangle dimensions without border and size adjustment', () => {
            const result = getRect([0, 0], 1, 1, 10, 0, 0);
            expect(result).toEqual([10, 10, 10, 10]);
        });

        it('should return correct rectangle dimensions with border', () => {
            const result = getRect([0, 0], 1, 1, 10, 1, 0);
            expect(result).toEqual([11, 11, 9, 9]);
        });

        it('should return correct rectangle dimensions with size adjustment', () => {
            const result = getRect([0, 0], 1, 1, 10, 0, 2);
            expect(result).toEqual([8, 8, 14, 14]);
        });

        it('should return correct rectangle dimensions with both border and size adjustment', () => {
            const result = getRect([0, 0], 1, 1, 10, 1, 2);
            expect(result).toEqual([9, 9, 13, 13]);
        });

        it('should handle negative offsets correctly', () => {
            const result = getRect([-10, -20], 1, 1, 10, 0, 0);
            expect(result).toEqual([0, -10, 10, 10]);
        });
    });
}