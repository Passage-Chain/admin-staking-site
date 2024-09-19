import { SigningCosmWasmClient } from '@cosmjs/cosmwasm-stargate'
import { VaultFactoryClient } from '@/lib/nft-staking/VaultFactory.client'
import _ from 'lodash'

export const txCreateVault = async (
  signingCwClient: SigningCosmWasmClient,
  sender: string,
  vaultFactoryAddress: string,
  label: string,
  unstakingDurationSec: number,
  collections: string[],
) => {
  const vaultFactoryClient = new VaultFactoryClient(
    signingCwClient,
    sender,
    vaultFactoryAddress,
  )

  return vaultFactoryClient.createVault(
    {
      unstakingDurationSec,
      collections,
      vaultLabel: label,
    },
    'auto',
    undefined,
    undefined,
  )
}
