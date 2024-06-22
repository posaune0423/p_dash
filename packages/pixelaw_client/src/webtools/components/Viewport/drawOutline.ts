import {Dimension} from "../../types.ts";

export function drawOutline(context: CanvasRenderingContext2D, dimensions: Dimension) {
    // Draw outline
    context.beginPath();
    context.rect(0, 0, dimensions[0], dimensions[1]);
    context.lineWidth = 2;
    context.strokeStyle = 'black';
    context.stroke();
}