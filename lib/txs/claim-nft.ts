import { SigningCosmWasmClient } from '@cosmjs/cosmwasm-stargate'
import _ from 'lodash'
import { NftVaultClient } from '../nft-staking/NftVault.client'

export const txClaimNfts = async (
  signingCwClient: SigningCosmWasmClient,
  sender: string,
  nftVaultAddress: string,
) => {
  const nftVaultClient = new NftVaultClient(
    signingCwClient,
    sender,
    nftVaultAddress,
  )

  return nftVaultClient.claim({}, 'auto', undefined, [])
}
