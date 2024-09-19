import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useCallback, useMemo } from 'react'
import { AssetManager } from '@/lib/classes/asset-manager'
import { Button } from '@/components/ui/button'
import { ExitIcon } from '@radix-ui/react-icons'
import Image from 'next/image'
import { shortenAddress } from '@/lib/utils/address'
import { useAssetManager } from '@/lib/providers/asset-manager'
import { useConnection } from '@/lib/providers/connection'
import { LoadingSpinner } from '../spinner'

export const WalletMenu = () => {
  const assetManager = useAssetManager()
  const { isConnected, address, connectToChain, disconnect } = useConnection()

  return (
    <div className="flex flex-row justify-center items-center">
      {isConnected ? (
        <WalletConnected
          assetManager={assetManager}
          address={address}
          disconnect={disconnect}
        />
      ) : (
        <WalletDisconnected connectToChain={connectToChain} />
      )}
    </div>
  )
}

const WalletDisconnected = ({
  connectToChain,
}: {
  connectToChain?: (chainId?: string) => any
}) => {
  const connect = useCallback(() => {
    return connectToChain ? connectToChain(undefined) : undefined
  }, [connectToChain])

  const disabled = !connect

  return (
    <Button className="w-32" onClick={connect} disabled={disabled}>
      {disabled ? (
        <LoadingSpinner className="w-full h-4" />
      ) : (
        <span>Connect Wallet</span>
      )}
    </Button>
  )
}

const WalletConnected = ({
  assetManager,
  address,
  disconnect,
}: {
  assetManager?: AssetManager
  address?: string
  disconnect?: () => any
}) => {
  const displayAmount = useMemo(() => {
    if (!assetManager) {
      return '0'
    }
    const asset = assetManager.getAsset('upasg')
    return asset.getDisplayAmount().toFixed(2)
  }, [assetManager])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-full">
          <div className="flex flex-row justify-between items-center text-sm space-x-4">
            <span className="opacity-90">{shortenAddress(address || '')}</span>
            {assetManager && (
              <div className="flex flex-row justify-center items-center space-x-1">
                <span className="opacity-70">{displayAmount}</span>
                <Image
                  src={assetManager.getAsset('upasg').getLogo() || ''}
                  alt={assetManager.getAsset('upasg').getLogoAlt()}
                  width={20}
                  height={20}
                />
              </div>
            )}
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Wallet</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={disconnect} className="cursor-pointer">
            Disconnect
            <ExitIcon className="w-4 h-4 ml-2" />
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
