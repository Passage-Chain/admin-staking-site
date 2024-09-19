import { ChainContext, sleep, type UserClient } from '@uju-labs/cosmos-utils'
import _ from 'lodash'
import assert from 'assert'
import { localConfig } from './configs/localnet'
import { InstantiateMsg as VaultFactoryInstantiateMsg } from '../lib/nft-staking/VaultFactory.types'

const mintNfts = async (
  context: ChainContext,
  collectionAddress: string,
  recipientAddress: string,
  tokenIds: string[],
) => {
  assert(context.adminUser, 'adminUser not found')
  const adminUser = context.adminUser

  for (const tokenId of tokenIds) {
    const executeMsg = {
      mint: {
        token_id: tokenId,
        owner: recipientAddress,
        token_uri: undefined,
        extension: undefined,
      },
    }
    await adminUser.cwClient.execute(
      adminUser.address,
      collectionAddress,
      executeMsg,
      'auto',
    )
    context.childLogger.info(`Minted ${tokenId} to ${recipientAddress}`)
  }
}

const instantiateVaultFactory = (
  context: ChainContext,
  adminUser: UserClient,
) => {
  const vaultCodeId = context.getCodeId(
    ChainContext.buildContractKey('nft-staking', 'nft-vault', '0.1.0'),
  )
  const rewardsCodeId = context.getCodeId(
    ChainContext.buildContractKey('nft-staking', 'stake-rewards', '0.1.0'),
  )
  const instantiateMsg: VaultFactoryInstantiateMsg = {
    vault_code_id: vaultCodeId,
    rewards_code_id: rewardsCodeId,
  }

  return context.instantiateContract(
    adminUser,
    ChainContext.buildContractKey('nft-staking', 'vault-factory', '0.1.0'),
    instantiateMsg,
  )
}

const instantiateNftCollection = (
  context: ChainContext,
  adminUser: UserClient,
  name: string,
  symbol: string,
  minter?: string,
  creator?: string,
) => {
  const instantiateMsg = {
    name,
    symbol,
    creator,
    minter,
    collection_info_extension: undefined,
    withdraw_address: undefined,
  }

  return context.instantiateContract(
    adminUser,
    ChainContext.buildContractKey('nft-staking', 'cw721', '0.19.0'),
    instantiateMsg,
    symbol,
    true,
  )
}

const setup = async (): Promise<void> => {
  const context = new ChainContext('nft-staking', localConfig, 'user0')

  // Sleep to allow for chain start
  await sleep(10000)

  await context.initialize()
  assert(context.adminUser, 'adminUser not found')

  await instantiateVaultFactory(context, context.adminUser)

  const instantiateResult1 = await instantiateNftCollection(
    context,
    context.adminUser,
    'Test1',
    'TEST1',
    undefined,
    context.adminUser.address,
  )
  assert(instantiateResult1, 'Failed to instantiate NFT collection')
  const collectionAddress1 = instantiateResult1.contractAddress

  const instantiateResult2 = await instantiateNftCollection(
    context,
    context.adminUser,
    'Test2',
    'TEST2',
    undefined,
    context.adminUser.address,
  )
  assert(instantiateResult2, 'Failed to instantiate NFT collection')
  const collectionAddress2 = instantiateResult2.contractAddress

  await mintNfts(context, collectionAddress1, context.adminUser.address, [
    '1',
    '2',
    '3',
  ])
  await mintNfts(context, collectionAddress2, context.adminUser.address, [
    '1',
    '2',
    '3',
    '4',
    '5',
  ])
}

setup().catch((err) => {
  console.error(err)
  process.exit(1)
})
