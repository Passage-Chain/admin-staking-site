import { SigningCosmWasmClient } from '@cosmjs/cosmwasm-stargate'
import _ from 'lodash'
import { NftVaultClient } from '../nft-staking/NftVault.client'

export const txUnstakeNft = async (
  signingCwClient: SigningCosmWasmClient,
  sender: string,
  nftVaultAddress: string,
  collection: string,
  tokenId: string,
) => {
  const nftVaultClient = new NftVaultClient(
    signingCwClient,
    sender,
    nftVaultAddress,
  )

  return nftVaultClient.unstake(
    {
      nfts: [{ collection, token_id: tokenId }],
    },
    'auto',
    undefined,
    [],
  )
}
