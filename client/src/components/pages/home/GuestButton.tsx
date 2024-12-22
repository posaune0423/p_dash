import { useAccount } from '@starknet-react/core'
import { Link } from 'react-router-dom'
import CustomButton from '@/components/CustomButton'
import { cn } from '@/utils'

const GuestButton = ({ className }: { className?: string }) => {
  const { address } = useAccount()
  if (address) return null

  return (
    <CustomButton className={cn('w-56', className)} size="lg" variant="outline" asChild>
      <Link to="/game">Play as Guest</Link>
    </CustomButton>
  )
}

export default GuestButton
