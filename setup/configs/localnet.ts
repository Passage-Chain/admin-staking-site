import { Config } from '@uju-labs/cosmos-utils'
import _ from 'lodash'
import path from 'path'

const projectRoot = path.resolve(__dirname, '../../../..')

export const localConfig: Config = {
  denom: 'upasg',
  prefix: 'pasg',
  chainId: 'passagelocal-1',
  endpoint: 'http://localhost:26657',
  graphqlEndpoint: 'http://localhost:3000',
  gasPrices: 0.8,
  gasAdjustment: 1.8,
  artifactsDir: path.resolve(__dirname, '../../artifacts/localnet'),
  artifacts: [
    {
      group: 'nft-staking',
      name: 'cw20',
      version: '2.0.0',
      resource: path.resolve(
        projectRoot,
        'apps/staking-site/setup/contracts/cw20_base.wasm',
      ),
    },
    {
      group: 'nft-staking',
      name: 'cw721',
      version: '0.19.0',
      resource: path.resolve(
        projectRoot,
        'apps/staking-site/setup/contracts/cw721_base.wasm',
      ),
    },
    {
      group: 'nft-staking',
      name: 'vault-factory',
      version: '0.1.0',
      resource: path.resolve(
        projectRoot,
        'protocols/nft-staking/artifacts/vault_factory.wasm',
      ),
    },
    {
      group: 'nft-staking',
      name: 'nft-vault',
      version: '0.1.0',
      resource: path.resolve(
        projectRoot,
        'protocols/nft-staking/artifacts/nft_vault.wasm',
      ),
    },
    {
      group: 'nft-staking',
      name: 'stake-rewards',
      version: '0.1.0',
      resource: path.resolve(
        projectRoot,
        'protocols/nft-staking/artifacts/stake_rewards.wasm',
      ),
    },
  ],
  users: [
    {
      name: 'user0',
      address: 'pasg16z43tjws3vw06ej9v7nrszu0ldsmn0ey9hux6f',
      mnemonic:
        'game cook seven draw girl special once poem rhythm seven winner praise demise trick access style bracket later tunnel slush lab false game park',
    },
    {
      name: 'user1',
      address: 'pasg1t08es9sxvjt3rmmkf426ks4ce528m0u8zm2try',
      mnemonic:
        'priority ozone forget detect main sheriff delay armor noble ability job front lawsuit never tooth soup wire nominee leopard country cherry ostrich language actress',
    },
    {
      name: 'user2',
      address: 'pasg1x0nystpdqr9dtcy02wh4tcmhjxjlnk00jhxlkf',
      mnemonic:
        'wife seminar album post drive garbage ceiling robot skirt sustain notice kite just discover noble nominee one escape clean heavy general segment narrow whisper',
    },
  ],
  denoms: [],
}
