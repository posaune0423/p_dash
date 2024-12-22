import { type ClassValue, clsx } from 'clsx'
import { shortString } from 'starknet'
import { twMerge } from 'tailwind-merge'
import { BlockType } from '@/libs/dojo/typescript/models.gen'
import { type Color } from '@/types'

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}

export const truncateAddress = (address: string) => {
  const truncateRegex = /^(0x[a-zA-Z0-9]{4})[a-zA-Z0-9]+([a-zA-Z0-9]{4})$/
  const match = address.match(truncateRegex)
  if (!match || match.length < 3) return address
  return `${match[1]}…${match[2]}`
}

export const formatDate = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return `${dateObj.getFullYear()}/${(dateObj.getMonth() + 1).toString().padStart(2, '0')}/${dateObj
    .getDate()
    .toString()
    .padStart(2, '0')}:${dateObj
    .getHours()
    .toString()
    .padStart(2, '0')}:${dateObj.getMinutes().toString().padStart(2, '0')}`
}

export const handleTransactionError = (error: unknown) => {
  console.error('Transaction error:', error)

  let errorMessage = 'An unexpected error occurred. Please try again.'

  if (error instanceof Error) {
    if (error.message.includes('Cooldown not over')) {
      errorMessage = 'Cooldown period is not over. Please wait and try again later.'
    } else if (error.message.includes('transaction reverted')) {
      errorMessage = 'Transaction was reverted.'
    } else if (error.message.includes('Error in the called contract')) {
      errorMessage = 'An error occurred while calling the contract.'
    } else if (error.message.includes('execution_error')) {
      errorMessage = 'An error occurred during the transaction execution.'
    }
  }

  return errorMessage
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
      console.error('Error decoding short string:', e)
      return felt252
    }
  }
  return felt252.toString()
}

export const rgbaToHex = (color: Color): number => {
  const r = Math.round(color.r * 255)
  const g = Math.round(color.g * 255)
  const b = Math.round(color.b * 255)
  const a = Math.round(color.a * 255)
  return ((r << 24) | (g << 16) | (b << 8) | a) >>> 0 // Convert to unsigned 32-bit integer
}

export const hexToRgba = (hex: number): Color => {
  const r = ((hex >>> 24) & 0xff) / 255
  const g = ((hex >>> 16) & 0xff) / 255
  const b = ((hex >>> 8) & 0xff) / 255
  const a = (hex & 0xff) / 255
  return { r, g, b, a }
}

export const hexRGBAtoNumber = (color: string) => {
  return parseInt(`0x${color}`, 16)
}

export const getBlockColor = (blockType: BlockType): string => {
  switch (blockType) {
    case BlockType.Block:
      return '0x808080FF'
    case BlockType.Spike:
      return '0xFF0000FF'
    case BlockType.Empty:
      return '0x00000000'
    case BlockType.Tile:
      return '0x8B4513FF'
    case BlockType.InitBlock:
      return '0xFFFF00FF'
    default:
      return '0xFFFFFFFF'
  }
}

export const getBlockType = (typeIndex: number) => {
  return BlockType[typeIndex]
}

export const blockTypeToIndex = (blockType: BlockType): number => {
  return Object.values(BlockType).indexOf(blockType)
}

export const felt252ToUnicode = (felt252: string | number): string => {
  const decodedString = felt252ToString(felt252)

  if (typeof decodedString === 'string' && decodedString.includes('U+')) {
    const cleanString = decodedString.replace(/\0/g, '').replace(/\s+/g, '')
    const text = cleanString.replace('U+', '')
    const codePoint = Number.parseInt(text, 16)

    if (Number.isNaN(codePoint)) return decodedString
    return String.fromCodePoint(codePoint)
  }

  return decodedString
}
