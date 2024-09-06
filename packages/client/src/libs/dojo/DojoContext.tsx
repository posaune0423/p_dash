import { type BurnerAccount, useBurnerManager } from '@dojoengine/create-burner'
import { useAccount } from '@starknet-react/core'
import { type ReactNode, createContext, useContext, useMemo } from 'react'
import { Account, type AccountInterface } from 'starknet'
import { type SetupResult } from '@/libs/dojo/setup'

interface DojoContextType extends SetupResult {
  masterAccount: Account
  account: BurnerAccount
  connectedAccount: AccountInterface | undefined
}

export const DojoContext = createContext<DojoContextType | null>(null)

export const DojoProvider = ({ children, value }: { children: ReactNode; value: SetupResult }) => {
  const currentValue = useContext(DojoContext)
  if (currentValue) throw new Error('DojoProvider can only be used once')

  const {
    config: { masterAddress, masterPrivateKey },
    burnerManager,
    dojoProvider,
  } = value

  const masterAccount = useMemo(
    () => new Account(dojoProvider.provider, masterAddress, masterPrivateKey, '1'),
    [masterAddress, masterPrivateKey, dojoProvider.provider],
  )

  const { account: connectedAccount } = useAccount()

  const {
    create,
    list,
    get,
    select,
    deselect,
    remove,
    clear,
    account,
    isDeploying,
    count,
    copyToClipboard,
    applyFromClipboard,
    checkIsDeployed,
  } = useBurnerManager({
    burnerManager,
  })

  return (
    <DojoContext.Provider
      value={{
        ...value,
        masterAccount,
        account: {
          create,
          list,
          get,
          select,
          deselect,
          remove,
          clear,
          account: account ? account : masterAccount,
          isDeploying,
          count,
          copyToClipboard,
          applyFromClipboard,
          checkIsDeployed,
        },
        connectedAccount,
      }}
    >
      {children}
    </DojoContext.Provider>
  )
}
