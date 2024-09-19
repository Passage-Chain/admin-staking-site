import { SigningCosmWasmClient } from '@cosmjs/cosmwasm-stargate'
import _ from 'lodash'
import { ExecuteMsg as NftVaultExecuteMsg } from '../nft-staking/NftVault.types'
import type { EncodeObject } from '@cosmjs/proto-signing'
import { MsgExecuteContract } from 'cosmjs-types/cosmwasm/wasm/v1/tx'
import { toUtf8 } from '@cosmjs/encoding'

export const txStakeNft = async (
  signingCwClient: SigningCosmWasmClient,
  sender: string,
  nftVaultAddress: string,
  collection: string,
  tokenId: string,
) => {
  const encodedMessages: EncodeObject[] = []

  const approveMsg = {
    approve: {
      spender: nftVaultAddress,
      token_id: tokenId,
    },
  }
  encodedMessages.push({
    typeUrl: '/cosmwasm.wasm.v1.MsgExecuteContract',
    value: MsgExecuteContract.fromPartial({
      sender: sender,
      contract: collection,
      msg: toUtf8(JSON.stringify(approveMsg)),
      funds: [],
    }),
  })

  const stakeMsg: NftVaultExecuteMsg = {
    stake: {
      nfts: [{ collection, token_id: tokenId }],
    },
  }

  encodedMessages.push({
    typeUrl: '/cosmwasm.wasm.v1.MsgExecuteContract',
    value: MsgExecuteContract.fromPartial({
      sender: sender,
      contract: nftVaultAddress,
      msg: toUtf8(JSON.stringify(stakeMsg)),
      funds: [],
    }),
  })

  return signingCwClient.signAndBroadcast(sender, encodedMessages, 'auto')
}
