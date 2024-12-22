import { type Connector, useConnect, useAccount } from '@starknet-react/core'
import { useNavigate } from 'react-router-dom'
import { useCallback, useMemo, useState, useEffect } from 'react'
import { toast } from 'sonner'
import CustomButton from '@/components/CustomButton'
import Spinner from '@/components/Spinner'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

const LoginButton = ({
  className,
  size = 'lg',
}: {
  className?: string
  size?: 'lg' | 'sm' | 'xl' | 'icon' | 'default' | null | undefined
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const { connectAsync, connectors } = useConnect()
  const [pending, setPending] = useState<Record<string, boolean>>({})
  const isPending = useMemo(() => Object.values(pending).some((value) => value), [pending])
  const navigate = useNavigate()
  const { address } = useAccount()

  useEffect(() => {
    setPending(Object.fromEntries(connectors.map(connector => [connector.id, false])))
  }, [connectors])

  const handleLogin = useCallback(async () => {
    if (address) {
      return navigate('/game')
    } else {
      setIsOpen(true)
    }
  }, [address, navigate])

  const handleConnect = useCallback(
    async (connector: Connector) => {
      try {
        setPending((prev) => ({ ...prev, [connector.id]: true }))
        await connectAsync({ connector })
        setIsOpen(false)
        toast.success('Successfully logged in')
        return navigate('/game')
      } catch (error) {
        console.error(error)
        toast.error('Wallet is not installed')
      } finally {
        setPending((prev) => ({ ...prev, [connector.id]: false }))
      }
    },
    [connectAsync, navigate],
  )

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <CustomButton className={className} size={size} variant="outline" onClick={handleLogin}>
          Login
        </CustomButton>
      </DialogTrigger>
      <DialogContent aria-disabled={isPending}>
        <DialogHeader>
          <DialogTitle>Choose How to connect</DialogTitle>
          <DialogDescription>Choose how you want to connect to the Dapp</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col space-y-3 py-2">
          {connectors.map((connector) => (
            <Button
              key={connector.id}
              onClick={() => handleConnect(connector)}
              className="flex w-full items-center gap-2"
              disabled={pending[connector.id]}
            >
              {typeof connector.icon === 'string' ? (
                connector.icon.startsWith('<') ? (
                  <div
                    className="flex max-h-6 max-w-6 items-center justify-center"
                    dangerouslySetInnerHTML={{ __html: connector.icon }}
                  />
                ) : (
                  <img src={connector.icon} alt={connector.name} width={24} height={24} />
                )
              ) : connector.icon?.dark && (
                <img src={connector.icon.dark} alt={connector.name} width={24} height={24} />
              )}
              {connector.name}
              {pending[connector.id] && <Spinner size={4} color="white" />}
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default LoginButton
