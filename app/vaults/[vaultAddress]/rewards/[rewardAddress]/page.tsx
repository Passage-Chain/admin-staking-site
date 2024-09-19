'use client'

import { Config, CumulativeRewards } from '@/lib/nft-staking/StakeRewards.types'
import { useConnection } from '@/lib/providers/connection'
import _ from 'lodash'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Contract } from '@cosmjs/cosmwasm-stargate'
import { StakeRewardsQueryClient } from '@/lib/nft-staking/StakeRewards.client'
import { Button } from '@/components/ui/button'
import { ChevronLeftIcon } from '@radix-ui/react-icons'

export default function ViewRewardAccount() {
  const router = useRouter()
  const params = useParams()
  const { cosmWasmClient } = useConnection()

  const [contract, setContract] = useState<Contract | undefined>(undefined)
  const [config, setConfig] = useState<Config | undefined>(undefined)
  const [rewards, setRewards] = useState<CumulativeRewards | undefined>(
    undefined,
  )

  const vaultAddress = params.vaultAddress as string
  const rewardAddress = params.rewardAddress as string

  useEffect(() => {
    ;(async () => {
      if (!cosmWasmClient) {
        return
      }

      const stakeRewardsQueryClient = new StakeRewardsQueryClient(
        cosmWasmClient,
        rewardAddress,
      )

      const [contract, config, rewards] = await Promise.all([
        cosmWasmClient.getContract(rewardAddress),
        stakeRewardsQueryClient.config(),
        stakeRewardsQueryClient.rewards(),
      ])

      setConfig(config)
      setContract(contract)
      setRewards(rewards)
    })()
  }, [cosmWasmClient, rewardAddress])

  return (
    <div className="max-w-screen-md flex flex-col justify-start items-center space-y-12 py-16 mx-auto">
      <div className="w-full flex flex-col justify-start items-start space-y-4">
        <Button
          variant="outline"
          onClick={() => router.push(`/vaults/${vaultAddress}`)}
        >
          <ChevronLeftIcon className="w-4 h-4" />
        </Button>
        <div className="w-full flex flex-row justify-between items-center space-x-4">
          <h1 className="text-3xl font-bold">{`Reward Account: ${contract?.label || '...'}`}</h1>
        </div>
        <h2>{rewardAddress}</h2>
      </div>
      <div className="w-full flex flex-col justify-start items-start space-y-4">
        <h3 className="text-2xl font-bold">Config</h3>
        <pre>{JSON.stringify(config, null, 2)}</pre>
      </div>
      <div className="w-full flex flex-col justify-start items-start space-y-4">
        <h3 className="text-2xl font-bold">Rewards</h3>
        <pre>{JSON.stringify(rewards, null, 2)}</pre>
      </div>
    </div>
  )
}
