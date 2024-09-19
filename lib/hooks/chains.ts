import { mainnetChains } from 'graz/chains'

import { ChainInfo } from '@keplr-wallet/types'
import _ from 'lodash'
import assert from 'assert'
import localPassageChainInfo from '../chain-infos/local-passage.json'
import { useEnvVars } from '../providers/env-vars'
import { useEffect, useMemo } from 'react'
import { useConnection } from '../providers/connection'
import { ChainId, isChainId } from '../utils/chain-id'
import { useActiveChainIds as useActiveChainIdsGraz } from 'graz'

export const useCurrentChainInfo = () => {
  const { chainName } = useConnection()
  const chainInfos = useChainInfos()
  return useMemo(() => {
    const retval = _.find(
      chainInfos,
      (chainInfo) => chainInfo.chainName === chainName,
    )
    assert(retval, `Chain info for chainName ${chainName} not found`)
    return retval
  }, [chainInfos, chainName])
}

export const useChainInfos = () => {
  const envVars = useEnvVars()

  return useMemo(() => {
    const chainInfos: ChainInfo[] = []

    const passageChainInfo = mainnetChains.passage
    // @ts-expect-error
    passageChainInfo.chainSymbolImageUrl =
      'https://raw.githubusercontent.com/cosmos/chain-registry/master/passage/images/pasg.png'
    chainInfos.push(passageChainInfo)

    if (envVars.development) {
      chainInfos.push(localPassageChainInfo)
    }

    return chainInfos
  }, [envVars.development])
}

export const useActiveChainIds = (): ChainId[] => {
  const activeChainIds = useActiveChainIdsGraz()

  useEffect(() => {
    _.forEach(activeChainIds, (chainId) => {
      assert(isChainId(chainId), `Invalid chainId: ${chainId}`)
    })
  }, [activeChainIds])

  return activeChainIds as ChainId[]
}
