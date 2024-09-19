import { AssetSource, PassageAsset } from '../classes/passage-asset'
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { useChainRegistryAssets, useInternalAssets } from '../hooks/assets'
import { AssetManager } from '../classes/asset-manager'
import { Metadata } from 'osmojs/cosmos/bank/v1beta1/bank'
import { PageRequest } from 'osmojs/cosmos/base/query/v1beta1/pagination'
import _ from 'lodash'
import { osmosis } from 'osmojs'
import { useBalances } from './balances'
import { useCurrentChainInfo } from '../hooks/chains'
import assert from 'assert'
import { isChainId } from '../utils/chain-id'

const AssetContext = createContext<AssetManager | undefined>(undefined)

export const AssetProvider = ({ children }: { children: ReactNode }) => {
  const chainInfo = useCurrentChainInfo()
  const chainRegistryAssets = useChainRegistryAssets()
  const internalAssets = useInternalAssets()
  const { balanceManager } = useBalances()

  const [bankModuleAssets, setBankModuleAssets] = useState<
    PassageAsset[] | undefined
  >(undefined)

  useEffect(() => {
    ;(async () => {
      const foundBankModuleAssets = await fetchDenomMetadatas(chainInfo?.rpc)
      if (foundBankModuleAssets) {
        setBankModuleAssets(foundBankModuleAssets)
      }
    })()
  }, [chainInfo?.rpc])

  const assetManager = useMemo(() => {
    if (!chainInfo) return undefined

    const chainId = chainInfo.chainId
    assert(isChainId(chainId), `Invalid chainId: ${chainId}`)

    let assets: PassageAsset[] = bankModuleAssets || []

    _.forEach(internalAssets[chainId], (asset) => {
      assets.push(new PassageAsset(asset, AssetSource.INTERNAL))
    })
    _.forEach(chainRegistryAssets[chainId], (asset) => {
      assets.push(new PassageAsset(asset, AssetSource.CHAIN_REGISTRY))
    })
    _.forEach(assets, (assets) => {
      if (balanceManager) {
        assets.setBaseBalance(balanceManager.getBalance(assets.getBase()))
      }
    })

    return new AssetManager(assets)
  }, [
    chainInfo?.chainName,
    internalAssets,
    chainRegistryAssets,
    bankModuleAssets,
    balanceManager,
  ])

  return (
    <AssetContext.Provider value={assetManager}>
      {children}
    </AssetContext.Provider>
  )
}

export const useAssetManager = () => {
  return useContext(AssetContext)
}

const fetchDenomMetadatas = async (
  rpcEndpoint?: string,
): Promise<PassageAsset[] | undefined> => {
  if (!rpcEndpoint) {
    return
  }

  const client = await osmosis.ClientFactory.createRPCQueryClient({
    rpcEndpoint,
  })

  const pageRequest = {
    limit: BigInt(100),
  } as PageRequest

  const metadatas: Metadata[] = []

  while (true) {
    const response = await client.cosmos.bank.v1beta1.denomsMetadata({
      pagination: PageRequest.fromPartial(pageRequest),
    })
    metadatas.push(...response.metadatas)

    if (BigInt(response.metadatas.length) < pageRequest.limit) {
      break
    }

    if (response.pagination?.nextKey) {
      pageRequest.key = response.pagination.nextKey
    }
  }

  return _.reduce(
    metadatas,
    (accum: PassageAsset[], metadata) => {
      let display = metadata.display
      if (!display && _.startsWith(metadata.base, 'factory/')) {
        display = _.split(metadata.base, '/')[2]
      }
      accum.push(
        new PassageAsset(
          {
            description: metadata.description,
            denom_units: metadata.denomUnits,
            base: metadata.base,
            name: metadata.name,
            display,
            symbol: metadata.symbol,
            logo_URIs: { png: metadata.uri },
            images: [{ png: metadata.uri }],
          },
          AssetSource.BANK_MODULE,
        ),
      )
      return accum
    },
    [],
  )
}
