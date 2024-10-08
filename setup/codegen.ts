import codegen from '@cosmwasm/ts-codegen'

codegen({
  contracts: [
    {
      name: 'NftVault',
      dir: '../../protocols/nft-staking/schema/nft-vault',
    },
    {
      name: 'StakeRewards',
      dir: '../../protocols/nft-staking/schema/stake-rewards',
    },
    {
      name: 'VaultFactory',
      dir: '../../protocols/nft-staking/schema/vault-factory',
    },
  ],
  outPath: './lib/nft-staking',

  options: {
    bundle: {
      bundleFile: 'index.ts',
      scope: 'contracts',
    },
    types: {
      enabled: true,
    },
    client: {
      enabled: true,
    },
    reactQuery: {
      enabled: true,
      optionalClient: true,
      version: 'v3',
      mutations: true,
      queryKeys: true,
      queryFactory: true,
    },
    recoil: {
      enabled: false,
    },
    messageComposer: {
      enabled: true,
    },
  },
}).then(() => {
  console.log('✨ all done!')
})
