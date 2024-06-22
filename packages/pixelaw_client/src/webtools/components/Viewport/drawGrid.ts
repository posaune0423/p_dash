import {Coordinate, Dimension} from "../../types.ts";
import {getCellSize} from "../../utils.ts";

export function drawGrid(context: CanvasRenderingContext2D, zoom: number, pixelOffset: Coordinate, dimensions: Dimension) {

    const [width, height] = dimensions
    const cellSize = getCellSize(zoom)

    const startDrawingAtX = 0 - pixelOffset[0]
    const endDrawingAtX = width + pixelOffset[0]

    const startDrawingAtY = 0 - pixelOffset[1]
    const endDrawingAtY = height + pixelOffset[1]

    context.beginPath();

    for (let i = startDrawingAtX; i <= endDrawingAtX; i += cellSize) {
        context.moveTo(i, 0);
        context.lineTo(i, height);
    }
    for (let j = startDrawingAtY; j <= endDrawingAtY; j += cellSize) {
        context.moveTo(0, j);
        context.lineTo(width, j);
    }
    context.strokeStyle = "#4B2A5E";
    context.stroke();


}