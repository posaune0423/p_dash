import { PNG } from 'pngjs';
import * as fs from 'fs';

const size = 10;
const png = new PNG({ width: size, height: size });

for (let y = 0; y < png.height; y++) {
    for (let x = 0; x < png.width; x++) {
        let idx = (png.width * y + x) << 2;

        // Create gradient from red to blue
        let red = Math.round(255 * (1 - y / png.height));
        let blue = Math.round(255 * y / png.height);

        png.data[idx] = red;
        png.data[idx+1] = 0;
        png.data[idx+2] = blue;
        png.data[idx+3] = 255;
    }
}

png.pack().pipe(fs.createWriteStream('out.png'));
