import assert from 'assert'
import _ from 'lodash'

const chainIdNameMap = {
  'passagelocal-1': 'passage-local',
  'passage-2': 'passage',
}

export type ChainId = keyof typeof chainIdNameMap

export const isChainId = (chainId: string): chainId is ChainId => {
  return chainId in chainIdNameMap
}

export const chainIdToName = (chainId: ChainId): ChainName => {
  assert(isChainId(chainId), `Invalid chainId: ${chainId}`)
  return chainIdNameMap[chainId]
}

export type ChainName = (typeof chainIdNameMap)[ChainId]

const chainNameIdMap = _.invert(chainIdNameMap) as Record<ChainName, ChainId>

export const isChainName = (chainName: string): chainName is ChainName => {
  return chainName in chainNameIdMap
}

export const chainNameToId = (rawChainName: string): ChainId => {
  assert(isChainName(rawChainName), `Invalid chainId: ${rawChainName}`)
  return chainNameIdMap[rawChainName]
}

export const DEFAULT_CHAIN_ID: ChainId = 'passage-2'
export const DEFAULT_CHAIN_NAME: ChainName = chainIdNameMap[DEFAULT_CHAIN_ID]
