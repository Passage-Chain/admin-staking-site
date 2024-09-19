import { useMemo } from 'react'

import { Asset } from '@chain-registry/types'
import _ from 'lodash'
import { assets } from 'chain-registry/mainnet/passage'
import { ChainId, chainNameToId } from '../utils/chain-id'
import localPassage from '../assets/local-passage.json'

export type AssetListMap = Record<ChainId, Asset[]>

export const useChainRegistryAssets = (): AssetListMap => {
  return useMemo(() => {
    return _.reduce(
      [assets],
      (accum: AssetListMap, assetList) => {
        const chainId = chainNameToId(assetList.chain_name)
        accum[chainId] = assetList.assets
        return accum
      },
      {} as AssetListMap,
    )
  }, [])
}

export const useInternalAssets = (): AssetListMap => {
  return useMemo(() => {
    return _.reduce(
      [localPassage],
      (accum: AssetListMap, assetList) => {
        const chainId = chainNameToId(assetList.chain_name)
        accum[chainId] = assetList.assets as Asset[]
        return accum
      },
      {} as AssetListMap,
    )
  }, [])
}
