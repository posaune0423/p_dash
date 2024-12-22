import { useAccount } from '@starknet-react/core'
import { Link } from 'react-router-dom'
import CustomButton from '@/components/CustomButton'

const GuestButton = () => {
  const { address } = useAccount()
  if (address) return null

  return (
    <CustomButton className="w-56" size="lg" variant="outline" asChild>
      <Link to="/game">Play as Guest</Link>
    </CustomButton>
  )
}

export default GuestButton
