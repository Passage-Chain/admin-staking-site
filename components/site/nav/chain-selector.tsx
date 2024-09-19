import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useChainInfos, useCurrentChainInfo } from '@/lib/hooks/chains'

import Image from 'next/image'
import _ from 'lodash'
import { useConnection } from '@/lib/providers/connection'

export const ChainSelector = () => {
  const chainInfos = useChainInfos()
  const chainInfo = useCurrentChainInfo()
  const { chainId, chainName, connectToChain } = useConnection()

  return chainInfos.length > 1 ? (
    <Select defaultValue={chainId} onValueChange={connectToChain}>
      <SelectTrigger className="flex flex-row justify-between items-center w-full px-4">
        <SelectValue placeholder="Select a chain" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Chains</SelectLabel>
          {connectToChain &&
            _.map(chainInfos, (chainInfo) => (
              <SelectItem key={chainInfo.chainId} value={chainInfo.chainId}>
                <div className="flex flex-row justify-start items-center space-x-2">
                  {chainInfo.chainSymbolImageUrl && (
                    <Image
                      src={chainInfo.chainSymbolImageUrl}
                      alt={chainInfo.chainName}
                      width={20}
                      height={20}
                    />
                  )}
                  <span>{_.startCase(chainInfo.chainName)}</span>
                </div>
              </SelectItem>
            ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  ) : (
    <div className="flex flex-row justify-start items-center space-x-2">
      {chainInfo.chainSymbolImageUrl && (
        <Image
          src={chainInfo.chainSymbolImageUrl}
          alt={chainInfo.chainName}
          width={20}
          height={20}
        />
      )}
      <span>{_.startCase(chainName)}</span>
    </div>
  )
}
