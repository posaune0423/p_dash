import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

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
  return `${dateObj.getFullYear()}/${(dateObj.getMonth() + 1)
    .toString()
    .padStart(2, '0')}/${dateObj
    .getDate()
    .toString()
    .padStart(2, '0')}:${dateObj
    .getHours()
    .toString()
    .padStart(2, '0')}:${dateObj.getMinutes().toString().padStart(2, '0')}`
}
