import {useState} from 'react';
import {Bounds, Coordinate, Pixel, PixelStore} from "../types.ts";
import {produce} from 'immer';

type State = { [key: string]: Pixel };

export function useSimplePixelStore(): PixelStore {
    const [state, setState] = useState<State>({});


    const getPixel = (coord: Coordinate): Pixel | undefined => {
        const key = `${coord[0]}_${coord[1]}`
        return state[key];
    };

    const setPixel = (key: string, pixel: Pixel): void => {
        setState(produce(draft => {
            draft[key] = pixel;
        }));
    };

    const setPixels = (pixels: { key: string, pixel: Pixel }[]): void => {
        setState(produce(draft => {
            pixels.forEach(({key, pixel}) => {
                draft[key] = pixel;
            });
        }));
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const prepare = (_bounds: Bounds): void => {
        // No implementation for now, SimplePixelStore is a dev tool
    }

    const refresh = (): void => {
        // No implementation for now, SimplePixelStore is a dev tool
    }

    return {getPixel, setPixel, setPixels, prepare, refresh};
}
