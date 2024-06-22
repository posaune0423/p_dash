import {shortString} from 'starknet'
import {Coordinate} from "@/webtools/types.ts";
import {Position} from "@/global/types.ts";

/*
* @notice converts a number to hexadecimal
* @param n is the decimal number to convert to hexadecimal
* */
export const convertToHexadecimal = (n: number) => n.toString(16)
export const prefixString = (prefix: string, base: string) => `${prefix}${base}`
export const convertToHexadecimalAndLeadWithOx = (n: number) => prefixString('0x', convertToHexadecimal(n))
export const convertToDecimal = (hexadecimalString: string) => {
    const n = hexadecimalString.replace("0x", "")
    return parseInt(n, 16);
}

// Function to convert a ReadableStream to a string
export async function streamToString(readableStream: ReadableStream) {
    const textDecoder = new TextDecoder();
    const reader = readableStream.getReader();
    let result = '';

    try {
        // eslint-disable-next-line no-constant-condition
        while (true) {
            const {done, value} = await reader.read();

            if (done) {
                break; // The stream has ended
            }

            result += textDecoder.decode(value);
        }

        return result;
    } finally {
        reader.releaseLock();
    }
}

export const felt252ToString = (felt252: string | number | bigint) => {
    if (typeof felt252 === 'bigint' || typeof felt252 === 'object') {
        felt252 = `0x${felt252.toString(16)}`
    }
    if (felt252 === '0x0' || felt252 === '0') return ''
    if (typeof felt252 === 'string') {
        try {
            return shortString.decodeShortString(felt252)
        } catch (e) {
            return felt252
        }
    }
    return felt252.toString()
}

export const felt252ToUnicode = (felt252: string | number) => {
    const string = felt252ToString(felt252)
    if (string.includes('U+')) {
        const text = string.replace('U+', '')
        const codePoint = parseInt(text, 16)
        return String.fromCodePoint(codePoint)
    }
    return string
}

export const formatAddress = (address: string) => {
    if (address.length > 30) {
        return address.substr(0, 6) + '...' + address.substr(address.length - 4, address.length)
    }

    return address
}

// Takes a RGB hex nr and converts it to numeric rgba (0 alpha)
export const coordinateToPosition = (coord: Coordinate): Position => {
    return {x: coord[0], y: coord[1]}
}

export const hexRGBtoNumber = (color: string) => {
    return parseInt(`0x${color}00`, 16)
}


// Converts the numeric RGBA to a normal hex color
// @dev this removes the Alpha channel.
// TODO: Eventually convert to rgb(255 0 153 / 80%)
// ref: https://developer.mozilla.org/en-US/docs/Web/CSS/color_value
export const numRGBAToHex = (rgba: number) => {
    let color = rgba >>> 8
    return '#' + (color).toString(16).padStart(6, "0")
}


export const removeNullsFromArray = <T>(array: (T | null)[]) => {
    return array.filter(element => element !== null) as T[]
}
