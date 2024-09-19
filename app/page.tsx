'use client'

import _ from 'lodash'
import { VaultFactoryQueryClient } from '@/lib/nft-staking/VaultFactory.client'
import { useConnection } from '@/lib/providers/connection'
import { useEnvVars } from '@/lib/providers/env-vars'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

export default function NftStakingLanding() {
  const router = useRouter()
  const envVars = useEnvVars()
  const { cosmWasmClient } = useConnection()

  const [vaults, setVaults] = useState<[number, string][] | undefined>(
    undefined,
  )

  useEffect(() => {
    ;(async () => {
      if (!cosmWasmClient) {
        return
      }

      const client = new VaultFactoryQueryClient(
        cosmWasmClient,
        envVars.vaultFactoryAddress,
      )

      const vaults = await client.vaults({ queryOptions: {} })
      setVaults(vaults)
    })()
  }, [cosmWasmClient, envVars.vaultFactoryAddress])

  return (
    <div className="max-w-screen-md flex flex-col justify-start items-center space-y-12 py-16 mx-auto">
      <div className="w-full flex flex-row justify-between items-center">
        <h1 className="text-3xl font-bold">Vaults</h1>
        <Button variant="outline" onClick={() => router.push('/vaults/create')}>
          Create Vault
        </Button>
      </div>
      <div className="w-full flex flex-col space-y-4">
        {_.map(vaults, (vault) => (
          <div
            key={vault[0]}
            className="w-full flex flex-row space-x-4 hover:bg-zinc-800 p-4 rounded-md cursor-pointer"
            onClick={() => router.push(`/vaults/${vault[1]}`)}
          >
            <div>{vault[0]}</div>
            <div>{vault[1]}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
