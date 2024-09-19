import { ReactNode } from 'react'
import { GrazProvider, WalletType } from 'graz'
import { useChainInfos } from '@/lib/hooks/chains'
import { useEnvVars } from './env-vars'

export const GrazInternalProvider = ({ children }: { children: ReactNode }) => {
  const envVars = useEnvVars()
  const chainInfos = useChainInfos()

  const defaultWallet = envVars.development ? WalletType.LEAP : WalletType.KEPLR

  return (
    <GrazProvider
      grazOptions={{
        chains: chainInfos,
        defaultWallet,
      }}
    >
      {children}
    </GrazProvider>
  )
}
