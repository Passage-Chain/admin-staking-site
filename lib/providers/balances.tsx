import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import _ from 'lodash'
import { BalanceManager } from '../classes/balance-manager'
import { useConnection } from './connection'

const BalancesContext = createContext<{
  balanceManager?: BalanceManager
  refreshBalances?: () => void
}>({ balanceManager: undefined, refreshBalances: undefined })

export const BalancesProvider = ({ children }: { children: ReactNode }) => {
  const { address, stargateClient } = useConnection()

  const [balanceManager, setBalanceManager] = useState<
    BalanceManager | undefined
  >()
  const [refresh, setRefresh] = useState<boolean>(false)

  useEffect(() => {
    ;(async function () {
      if (!stargateClient || !address) return
      const balances = await stargateClient.getAllBalances(address)
      setBalanceManager(new BalanceManager(balances))
    })()
  }, [address, stargateClient, refresh])

  const refreshBalances = useCallback(() => {
    setRefresh(!refresh)
  }, [refresh])

  return (
    <BalancesContext.Provider value={{ balanceManager, refreshBalances }}>
      {children}
    </BalancesContext.Provider>
  )
}

export const useBalances = () => {
  return useContext(BalancesContext)
}
