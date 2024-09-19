import { SigningCosmWasmClient } from '@cosmjs/cosmwasm-stargate'
import _ from 'lodash'
import { NftVaultClient } from '../nft-staking/NftVault.client'
import { Coin } from '@cosmjs/stargate'

export const txCreateRewardAccount = async (
  signingCwClient: SigningCosmWasmClient,
  sender: string,
  nftVaultAddress: string,
  label: string,
  durationSec: number,
  funds: Coin,
) => {
  const nftVaultClient = new NftVaultClient(
    signingCwClient,
    sender,
    nftVaultAddress,
  )

  return nftVaultClient.createRewardAccount(
    {
      denom: funds.denom,
      durationSec,
      label,
    },
    'auto',
    undefined,
    [funds],
  )
}
