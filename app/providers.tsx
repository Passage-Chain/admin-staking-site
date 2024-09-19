'use client'

import _ from 'lodash'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AssetProvider } from '@/lib/providers/asset-manager'
import { BalancesProvider } from '@/lib/providers/balances'
import { EnvVarsProvider } from '@/lib/providers/env-vars'
import { ConnectionProvider } from '@/lib/providers/connection'
import { GrazInternalProvider } from '../lib/providers/graz-internal'

const queryClient = new QueryClient()

export default function Providers({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <EnvVarsProvider>
      <GrazInternalProvider>
        <ConnectionProvider>
          <QueryClientProvider client={queryClient}>
            <BalancesProvider>
              <AssetProvider>{children}</AssetProvider>
            </BalancesProvider>
          </QueryClientProvider>
        </ConnectionProvider>
      </GrazInternalProvider>
    </EnvVarsProvider>
  )
}
