import { SigningCosmWasmClient } from '@cosmjs/cosmwasm-stargate'
import _ from 'lodash'
import { NftVaultClient } from '../nft-staking/NftVault.client'
import { Coin } from '@cosmjs/stargate'

export const txCreateRewardAccount = async (
  signingCwClient: SigningCosmWasmClient,
  sender: string,
  nftVaultAddress: string,
  label: string,
  periodStart: Date,
  durationSec: number,
  funds: Coin,
) => {
  const nftVaultClient = new NftVaultClient(
    signingCwClient,
    sender,
    nftVaultAddress,
  )

  const periodStartEpoch = (periodStart.getTime() * 1000000).toString()

  return nftVaultClient.createRewardAccount(
    {
      denom: funds.denom,
      periodStart: periodStartEpoch,
      durationSec,
      label,
    },
    'auto',
    undefined,
    [funds],
  )
}
