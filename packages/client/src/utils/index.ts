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
