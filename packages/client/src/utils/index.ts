import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { type Color } from '@/components/StageEditor/types'

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}

export const truncateAddress = (address: string, withPrefix?: boolean) => {
  const truncateRegex = /^(0x[a-zA-Z0-9]{4})[a-zA-Z0-9]+([a-zA-Z0-9]{4})$/
  const match = address.match(truncateRegex)
  if (!match || match.length < 3) return address
  const part1 = match[1] || ''
  const part2 = match[2] || ''
  return `${withPrefix ? '0x' : ''}${part1}…${part2}`
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

export const rgbaToHex = (color: Color): number => {
  const r = Math.round(color.r * 255)
  const g = Math.round(color.g * 255)
  const b = Math.round(color.b * 255)
  const a = Math.round(color.a * 255)

  return (r << 24) | (g << 16) | (b << 8) | a
}

export const hexToRgba = (hex: number): Color => {
  const r = ((hex >> 24) & 0xff) / 255
  const g = ((hex >> 16) & 0xff) / 255
  const b = ((hex >> 8) & 0xff) / 255
  const a = (hex & 0xff) / 255

  return { r, g, b, a }
}
