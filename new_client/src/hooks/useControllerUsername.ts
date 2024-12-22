import { useAccount } from '@starknet-react/core'
import { useState, useEffect } from 'react'
import ControllerConnector from '@cartridge/connector/controller'

export const useControllerUsername = () => {
  const { address, connector } = useAccount()
  const [username, setUsername] = useState<string | undefined>(undefined)

  useEffect(() => {
    const fetchUsername = async () => {
      if (!address || !connector) {
        setUsername(undefined)
        return
      }

      const cartridgeConnector = connector as never as ControllerConnector
      if (typeof cartridgeConnector.username === 'function') {
        try {
          const name = await cartridgeConnector.username()
          setUsername(name)
        } catch (error) {
          console.error('Error fetching username:', error)
          setUsername(undefined)
        }
      }
    }

    fetchUsername()
  }, [address, connector])

  return { username }
}
