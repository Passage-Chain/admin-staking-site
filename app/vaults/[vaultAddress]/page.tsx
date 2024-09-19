'use client'

import { Button } from '@/components/ui/button'
import { NftVaultQueryClient } from '@/lib/nft-staking/NftVault.client'
import { ConfigForAddr } from '@/lib/nft-staking/NftVault.types'
import { useConnection } from '@/lib/providers/connection'
import _ from 'lodash'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Contract } from '@cosmjs/cosmwasm-stargate'
import { ChevronLeftIcon } from '@radix-ui/react-icons'

export default function ViewVault() {
  const router = useRouter()
  const params = useParams()
  const { cosmWasmClient } = useConnection()

  const [contract, setContract] = useState<Contract | undefined>(undefined)
  const [config, setConfig] = useState<ConfigForAddr | undefined>(undefined)
  const [rewardAccounts, setRewardAccounts] = useState<string[] | undefined>(
    undefined,
  )
  const [totalStakedAmount, setTotalStakedAmount] = useState<
    string | undefined
  >(undefined)

  const vaultAddress = params.vaultAddress as string

  useEffect(() => {
    ;(async () => {
      if (!cosmWasmClient) {
        return
      }

      const nftVaultQueryClient = new NftVaultQueryClient(
        cosmWasmClient,
        vaultAddress,
      )

      const [contract, config, rewardAccounts, totalStakedAmount] =
        await Promise.all([
          cosmWasmClient.getContract(vaultAddress),
          nftVaultQueryClient.config(),
          nftVaultQueryClient.rewardAccounts(),
          nftVaultQueryClient.totalStakedAmountAtHeight({}),
        ])

      setConfig(config)
      setContract(contract)
      setRewardAccounts(rewardAccounts)
      setTotalStakedAmount(totalStakedAmount || '0')
    })()
  }, [cosmWasmClient, vaultAddress])

  return (
    <div className="max-w-screen-md flex flex-col justify-start items-center space-y-12 py-16 mx-auto">
      <div className="w-full flex flex-col justify-start items-start space-y-4">
        <Button variant="outline" onClick={() => router.push(`/`)}>
          <ChevronLeftIcon className="w-4 h-4" />
        </Button>
        <div className="w-full flex flex-row justify-between items-center space-x-4">
          <h1 className="text-3xl font-bold">{`Vault: ${contract?.label || '...'}`}</h1>
          <div className="flex flex-row space-x-4">
            <Button
              variant="outline"
              onClick={() => router.push(`/vaults/${vaultAddress}/rewards`)}
            >
              Add Rewards
            </Button>
            <Button
              onClick={() =>
                router.push(`/vaults/${vaultAddress}/manage-stake`)
              }
            >
              Manage Stake
            </Button>
          </div>
        </div>
        <h2>{vaultAddress}</h2>
      </div>
      <div className="w-full flex flex-col justify-start items-start space-y-4">
        <h3 className="text-2xl font-bold">Total Staked Amount</h3>
        <pre>{totalStakedAmount}</pre>
      </div>
      <div className="w-full flex flex-col justify-start items-start space-y-4">
        <h3 className="text-2xl font-bold">Config</h3>
        <pre>{JSON.stringify(config, null, 2)}</pre>
      </div>
      <div className="w-full flex flex-col justify-start items-start space-y-4">
        <h3 className="text-2xl font-bold">Reward Accounts</h3>
        {_.map(rewardAccounts, (rewardAccount, idx) => (
          <div
            key={rewardAccount}
            className="w-full flex flex-row space-x-4 hover:bg-zinc-800 p-4 rounded-md cursor-pointer"
            onClick={() =>
              router.push(`/vaults/${vaultAddress}/rewards/${rewardAccount}`)
            }
          >
            <div>{idx}</div>
            <div>{rewardAccount}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
