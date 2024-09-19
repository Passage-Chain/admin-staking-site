import { ReactNode } from 'react'
import { GrazProvider, WalletType } from 'graz'
import { useChainInfos } from '@/lib/hooks/chains'

export const GrazInternalProvider = ({ children }: { children: ReactNode }) => {
  const chainInfos = useChainInfos()

  return (
    <GrazProvider
      grazOptions={{
        chains: chainInfos,
        defaultWallet: WalletType.LEAP,
      }}
    >
      {children}
    </GrazProvider>
  )
}
