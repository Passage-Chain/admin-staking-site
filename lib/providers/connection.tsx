import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useMemo,
} from 'react'
import _ from 'lodash'
import { useLocalStorage } from '../hooks/local-storage'
import {
  ChainId,
  ChainName,
  DEFAULT_CHAIN_ID,
  DEFAULT_CHAIN_NAME,
  chainIdToName,
  isChainId,
} from '../utils/chain-id'
import {
  useAccount,
  useStargateClient,
  useConnect,
  useDisconnect,
  useCosmWasmClient,
} from 'graz'
import { StargateClient } from '@cosmjs/stargate'
import { CosmWasmClient } from '@cosmjs/cosmwasm-stargate'
import assert from 'assert'

const ConnectionContext = createContext<{
  chainId: ChainId
  chainName: ChainName
  isConnected: boolean
  address?: string
  stargateClient?: StargateClient
  cosmWasmClient?: CosmWasmClient
  connectToChain?: (changeChainId?: string) => void
  disconnect?: () => void
}>({
  chainId: DEFAULT_CHAIN_ID,
  chainName: DEFAULT_CHAIN_NAME,
  isConnected: false,
})

export const ConnectionProvider = ({ children }: { children: ReactNode }) => {
  const [chainId, setChainId] = useLocalStorage<ChainId>(
    'chain-id',
    DEFAULT_CHAIN_ID,
  )

  const chainName = useMemo(() => chainIdToName(chainId), [chainId])

  const { connect } = useConnect()
  const { disconnect } = useDisconnect()
  const { data: stargateClient } = useStargateClient({
    chainId,
  })
  const { data: cosmWasmClient } = useCosmWasmClient({ chainId })
  const { data: account, isConnected } = useAccount({ chainId })

  const address = account?.bech32Address

  const connectToChain = useCallback(
    (changeChainId?: string) => {
      const nextChainId = changeChainId || chainId
      console.log('nextChainId', nextChainId)
      assert(isChainId(nextChainId), `Invalid chain id: ${nextChainId}`)
      setChainId(nextChainId as ChainId)
      connect({ chainId: nextChainId })
    },
    [setChainId, connect, chainId],
  )

  return (
    <ConnectionContext.Provider
      value={{
        chainId,
        chainName,
        isConnected,
        address,
        stargateClient,
        cosmWasmClient,
        connectToChain,
        disconnect,
      }}
    >
      {children}
    </ConnectionContext.Provider>
  )
}

export const useConnection = () => {
  return useContext(ConnectionContext)
}
