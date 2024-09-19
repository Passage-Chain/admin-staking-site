'use client'

import { useTx } from '@/lib/hooks/transaction'
import _ from 'lodash'
import { useParams, useRouter } from 'next/navigation'
import { useConnection } from '@/lib/providers/connection'
import { useCallback, useEffect, useState } from 'react'
import { NftVaultQueryClient } from '@/lib/nft-staking/NftVault.client'
import { Contract } from '@cosmjs/cosmwasm-stargate'
import {
  Claim,
  ConfigForAddr,
  QueryBoundForTupleOfStringAndString,
} from '@/lib/nft-staking/NftVault.types'
import { fetchAllTokenIdsByOwner } from '@/lib/utils/nft'
import { Button } from '@/components/ui/button'
import { txStakeNft } from '@/lib/txs/stake-nft'
import { txUnstakeNft } from '@/lib/txs/unstake-nft'
import { txClaimNfts } from '@/lib/txs/claim-nft'
import { StakeRewardsQueryClient } from '@/lib/nft-staking/StakeRewards.client'
import { txClaimRewards } from '@/lib/txs/claim-rewards'
import { txUpdateRewards } from '@/lib/txs/update-rewards'

export default function ManageVaultStake() {
  const router = useRouter()
  const params = useParams()
  const { cosmWasmClient } = useConnection()
  const { signingCwClient, sender, exec } = useTx()

  const nftVaultAddress = params.vaultAddress as string

  const [refresh, setRefresh] = useState(false)
  const [contract, setContract] = useState<Contract | undefined>(undefined)
  const [rewardAccounts, setRewardAccounts] = useState<string[] | undefined>(
    undefined,
  )
  const [config, setConfig] = useState<ConfigForAddr | undefined>(undefined)
  const [userNftMap, setUserNftMap] = useState<
    Record<string, string[]> | undefined
  >(undefined)
  const [stakedNftMap, setStakedNftMap] = useState<
    Record<string, string[]> | undefined
  >(undefined)
  const [claims, setClaims] = useState<Claim[] | undefined>(undefined)
  const [userRewards, setUserRewards] = useState<string[] | undefined>(
    undefined,
  )
  useEffect(() => {
    ;(async () => {
      if (!cosmWasmClient) {
        return
      }

      const nftVaultQueryClient = new NftVaultQueryClient(
        cosmWasmClient,
        nftVaultAddress,
      )

      const [contract, config, rewardAccounts] = await Promise.all([
        cosmWasmClient.getContract(nftVaultAddress),
        nftVaultQueryClient.config(),
        nftVaultQueryClient.rewardAccounts(),
      ])

      setConfig(config)
      setContract(contract)
      setRewardAccounts(rewardAccounts)
    })()
  }, [cosmWasmClient, nftVaultAddress])

  useEffect(() => {
    ;(async () => {
      if (!cosmWasmClient || !config || !sender) {
        return
      }
      const userNftMap: Record<string, string[]> = {}
      for (const collection of config.collections) {
        const tokens = await fetchAllTokenIdsByOwner(
          cosmWasmClient,
          collection,
          sender,
        )
        userNftMap[collection] = tokens
      }
      setUserNftMap(userNftMap)
    })()
  }, [cosmWasmClient, config, sender, refresh])

  useEffect(() => {
    ;(async () => {
      if (!cosmWasmClient || !sender) {
        return
      }

      const nftVaultQueryClient = new NftVaultQueryClient(
        cosmWasmClient,
        nftVaultAddress,
      )

      // Fetch staked NFTs
      const stakedNftMap: Record<string, string[]> = {}

      const limit = 20
      let responseLength = limit
      let min: QueryBoundForTupleOfStringAndString | undefined = undefined
      while (responseLength === limit) {
        const stakedNfts = await nftVaultQueryClient.usersStakedNfts({
          staker: sender,
          queryOptions: {
            limit,
            descending: false,
            min,
          },
        })

        const lastStakedNft = stakedNfts[stakedNfts.length - 1]
        min = {
          exclusive: [lastStakedNft.nft.collection, lastStakedNft.nft.token_id],
        }
        responseLength = stakedNfts.length

        for (const stakedNft of stakedNfts) {
          if (!stakedNftMap[stakedNft.nft.collection]) {
            stakedNftMap[stakedNft.nft.collection] = []
          }
          stakedNftMap[stakedNft.nft.collection].push(stakedNft.nft.token_id)
        }
      }

      setStakedNftMap(stakedNftMap)

      // Fetch claims
      const claims = await nftVaultQueryClient.claims({ staker: sender })
      setClaims(claims)
    })()
  }, [cosmWasmClient, nftVaultAddress, sender, refresh])

  useEffect(() => {
    ;(async () => {
      if (!cosmWasmClient || !sender || !rewardAccounts) {
        return
      }

      const userRewards: string[] = []
      for (const rewardAccount of rewardAccounts) {
        const stakeRewardsClient = new StakeRewardsQueryClient(
          cosmWasmClient,
          rewardAccount,
        )
        const config = await stakeRewardsClient.config()
        const userReward = await stakeRewardsClient.userReward({
          address: sender,
        })
        if (userReward) {
          userRewards.push(`${userReward.pending_rewards}${config.denom}`)
        }
      }
      setUserRewards(userRewards)
    })()
  }, [cosmWasmClient, rewardAccounts, sender, refresh])

  const onStake = useCallback(
    async (collection: string, tokenId: string) => {
      if (!signingCwClient || !sender) {
        return
      }

      try {
        await exec(
          'Stake Nft',
          txStakeNft.bind(
            null,
            signingCwClient,
            sender,
            nftVaultAddress,
            collection,
            tokenId,
          ),
        )

        setRefresh(!refresh)
      } catch (e) {
        console.error(e)
      }
    },
    [signingCwClient, sender, exec, nftVaultAddress, refresh],
  )

  const onUnstake = useCallback(
    async (collection: string, tokenId: string) => {
      if (!signingCwClient || !sender) {
        return
      }

      try {
        await exec(
          'Unstake Nft',
          txUnstakeNft.bind(
            null,
            signingCwClient,
            sender,
            nftVaultAddress,
            collection,
            tokenId,
          ),
        )

        setRefresh(!refresh)
      } catch (e) {
        console.error(e)
      }
    },
    [signingCwClient, sender, exec, nftVaultAddress, refresh],
  )

  const onClaimNfts = useCallback(async () => {
    if (!signingCwClient || !sender) {
      return
    }

    try {
      await exec(
        'Claim Nfts',
        txClaimNfts.bind(null, signingCwClient, sender, nftVaultAddress),
      )

      setRefresh(!refresh)
    } catch (e) {
      console.error(e)
    }
  }, [signingCwClient, sender, exec, nftVaultAddress, refresh])

  const onUpdateRewards = useCallback(async () => {
    if (!signingCwClient || !sender) {
      return
    }

    try {
      await exec(
        'Update Rewards',
        txUpdateRewards.bind(null, signingCwClient, sender, nftVaultAddress),
      )

      setRefresh(!refresh)
    } catch (e) {
      console.error(e)
    }
  }, [signingCwClient, sender, exec, nftVaultAddress, refresh])

  const onClaimRewards = useCallback(async () => {
    if (!signingCwClient || !sender) {
      return
    }

    try {
      await exec(
        'Claim Rewards',
        txClaimRewards.bind(null, signingCwClient, sender, nftVaultAddress),
      )

      setRefresh(!refresh)
    } catch (e) {
      console.error(e)
    }
  }, [signingCwClient, sender, exec, nftVaultAddress, refresh])

  return (
    <div className="max-w-screen-md flex flex-col justify-start items-center space-y-12 py-16 mx-auto">
      <div className="w-full flex flex-col justify-start items-start space-y-4">
        <h1 className="text-3xl font-bold">Manage Vault Stake</h1>
      </div>
      <div className="w-full flex flex-col justify-start items-start space-y-4">
        <h2 className="text-xl font-bold">NFTs in your wallet</h2>
        <p className="text-sm text-gray-500">Click to stake</p>
        {_.map(userNftMap, (tokenIds, collection) => (
          <div key={collection}>
            <h2>{`Collection: ${collection}`}</h2>
            <div className="flex flex-row flex-wrap gap-2">
              <span>Token IDs</span>
              {tokenIds.map((tokenId) => (
                <Button
                  variant="outline"
                  key={tokenId}
                  onClick={() => onStake(collection, tokenId)}
                >
                  {tokenId}
                </Button>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="w-full flex flex-col justify-start items-start space-y-4">
        <h2 className="text-xl font-bold">NFTs staked in the vault</h2>
        <p className="text-sm text-gray-500">Click to unstake</p>
        {_.map(stakedNftMap, (tokenIds, collection) => (
          <div key={collection}>
            <h2>{`Collection: ${collection}`}</h2>
            <div className="flex flex-row flex-wrap gap-2">
              <span>Token IDs</span>
              {tokenIds.map((tokenId) => (
                <Button
                  variant="outline"
                  key={tokenId}
                  onClick={() => onUnstake(collection, tokenId)}
                >
                  {tokenId}
                </Button>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="w-full flex flex-col justify-start items-start space-y-4">
        <div className="w-full flex flex-row justify-between items-center">
          <h2 className="text-xl font-bold">Claim NFTs</h2>
          <Button onClick={onClaimNfts}>Claim All Nfts</Button>
        </div>
        {_.map(claims, (claim, idx) => {
          const atTime =
            'at_time' in claim.release_at ? claim.release_at.at_time : undefined

          const dateTime = new Date(0)
          dateTime.setUTCMilliseconds(Number(atTime) / 1000000)

          return (
            <div key={atTime}>
              <h2>{`Release at: ${dateTime.toLocaleString()}`}</h2>
              <h2>{JSON.stringify(claim.nfts, null, 2)}</h2>
            </div>
          )
        })}
      </div>
      <div className="w-full flex flex-col justify-start items-start space-y-4">
        <div className="w-full flex flex-row justify-between items-center">
          <h2 className="text-xl font-bold">Claim Rewards</h2>
          <div className="flex flex-row space-x-4">
            <Button onClick={onClaimRewards}>Claim All Rewards</Button>
          </div>
        </div>
        {userRewards?.map((reward) => <div key={reward}>{reward}</div>)}
      </div>
    </div>
  )
}
