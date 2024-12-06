import { ChainContext, sleep, type UserClient } from '@uju-labs/cosmos-utils'
import _ from 'lodash'
import assert from 'assert'
import { localConfig } from './configs/localnet'
import { InstantiateMsg as VaultFactoryInstantiateMsg } from '../lib/nft-staking/VaultFactory.types'
import { VaultFactoryClient } from '@/lib/nft-staking/VaultFactory.client'

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

const instantiateCw20 = (context: ChainContext, adminUser: UserClient) => {
  return context.instantiateContract(
    adminUser,
    ChainContext.buildContractKey('nft-staking', 'cw20', '2.0.0'),
    {
      name: 'Reward Token',
      symbol: 'RWD',
      decimals: 6,
      initial_balances: [
        {
          amount: '1000000000000000',
          address: adminUser.address,
        },
      ],
      mint: undefined,
      marketing: undefined,
    },
    'Reward Token',
    true,
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

const instantiateVault = async (
  adminUser: UserClient,
  vaultFactoryAddress: string,
  collections: string[],
) => {
  const vaultFactoryClient = new VaultFactoryClient(
    adminUser.cwClient,
    adminUser.address,
    vaultFactoryAddress,
  )

  const unstakingDurationSec = 30
  const vaultLabel = 'Test Vault 1'

  return vaultFactoryClient.createVault({
    collections,
    unstakingDurationSec,
    vaultLabel,
  })
}

const setup = async (): Promise<void> => {
  const context = new ChainContext('nft-staking', localConfig, 'user0')

  // Sleep to allow for chain start
  await sleep(10000)

  await context.initialize()
  assert(context.adminUser, 'adminUser not found')

  await instantiateVaultFactory(context, context.adminUser)
  await instantiateCw20(context, context.adminUser)

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

  const vaultFactoryAddress = await context.expectContractAddress(
    ChainContext.buildContractKey('nft-staking', 'vault-factory', '0.1.0'),
  )
  await instantiateVault(context.adminUser, vaultFactoryAddress, [
    collectionAddress1,
    collectionAddress2,
  ])
  context.childLogger.info(`Vault created`)
}

setup().catch((err) => {
  console.error(err)
  process.exit(1)
})
