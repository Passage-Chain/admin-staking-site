import { SigningCosmWasmClient } from '@cosmjs/cosmwasm-stargate'
import _ from 'lodash'
import { ExecuteMsg as NftVaultExecuteMsg } from '../nft-staking/NftVault.types'
import { RewardAsset } from '../nft-staking/NftVault.types'
import { Coin } from '@cosmjs/stargate'
import type { EncodeObject } from '@cosmjs/proto-signing'
import { MsgExecuteContract } from 'cosmjs-types/cosmwasm/wasm/v1/tx'
import { toUtf8 } from '@cosmjs/encoding'

export const txCreateRewardAccount = async (
  signingCwClient: SigningCosmWasmClient,
  sender: string,
  nftVaultAddress: string,
  label: string,
  periodStart: Date,
  durationSec: number,
  rewardFunds: Coin,
) => {
  const encodedMessages: EncodeObject[] = []

  const periodStartEpoch = (periodStart.getTime() * 1000000).toString()

  let rewardAsset: RewardAsset
  let msgFunds: Coin[] = []
  if (rewardFunds.denom.startsWith('pasg')) {
    rewardAsset = {
      cw20: rewardFunds.denom,
    }

    encodedMessages.push({
      typeUrl: '/cosmwasm.wasm.v1.MsgExecuteContract',
      value: MsgExecuteContract.fromPartial({
        sender: sender,
        contract: rewardFunds.denom,
        msg: toUtf8(
          JSON.stringify({
            transfer: {
              recipient: nftVaultAddress,
              amount: rewardFunds.amount,
            },
          }),
        ),
        funds: [],
      }),
    })
  } else {
    rewardAsset = {
      native: rewardFunds.denom,
    }

    msgFunds.push(rewardFunds)
  }

  const createRewardAccountMsg: NftVaultExecuteMsg = {
    create_reward_account: {
      reward_asset: rewardAsset,
      period_start: periodStartEpoch,
      duration_sec: durationSec,
      label,
    },
  }

  encodedMessages.push({
    typeUrl: '/cosmwasm.wasm.v1.MsgExecuteContract',
    value: MsgExecuteContract.fromPartial({
      sender: sender,
      contract: nftVaultAddress,
      msg: toUtf8(JSON.stringify(createRewardAccountMsg)),
      funds: msgFunds,
    }),
  })

  console.log(createRewardAccountMsg)

  return signingCwClient.signAndBroadcast(sender, encodedMessages, 'auto')
}
