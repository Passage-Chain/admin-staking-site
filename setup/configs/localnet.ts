import { Config } from '@uju-labs/cosmos-utils'
import _ from 'lodash'
import path from 'path'

const projectRoot = path.resolve(__dirname, '../../../..')

export const localConfig: Config = {
  denom: 'upasg',
  prefix: 'pasg',
  chainId: 'testing',
  endpoint: 'http://localhost:26657',
  graphqlEndpoint: 'http://localhost:3000',
  gasPrices: 0.8,
  gasAdjustment: 1.8,
  artifactsDir: path.resolve(__dirname, '../artifacts/localnet'),
  artifacts: [
    {
      group: 'stardex',
      name: 'stake-native',
      version: '0.1.0',
      resource: path.resolve(
        projectRoot,
        'protocols/stardex-contracts/artifacts/stardex_stake_native.wasm',
      ),
    },
    {
      group: 'stardex',
      name: 'stake-rewards',
      version: '0.1.0',
      resource: path.resolve(
        projectRoot,
        'protocols/stardex-contracts/artifacts/stardex_stake_rewards.wasm',
      ),
    },
  ],
  users: [
    {
      name: 'user0',
      address: 'stars16z43tjws3vw06ej9v7nrszu0ldsmn0eyjnjpu8',
      mnemonic:
        'game cook seven draw girl special once poem rhythm seven winner praise demise trick access style bracket later tunnel slush lab false game park',
    },
    {
      name: 'user1',
      address: 'stars1t08es9sxvjt3rmmkf426ks4ce528m0u84lyv92',
      mnemonic:
        'priority ozone forget detect main sheriff delay armor noble ability job front lawsuit never tooth soup wire nominee leopard country cherry ostrich language actress',
    },
    {
      name: 'user2',
      address: 'stars1x0nystpdqr9dtcy02wh4tcmhjxjlnk009ngcs8',
      mnemonic:
        'wife seminar album post drive garbage ceiling robot skirt sustain notice kite just discover noble nominee one escape clean heavy general segment narrow whisper',
    },
    {
      name: 'user3',
      address: 'stars1v3fwgyw9kgtm08dpmfrlergxzxazwqa3qqxvd7',
      mnemonic:
        'deposit piece interest because warm gadget pen point settle own all benefit point august garden task broom velvet noble true next impose hood traffic',
    },
    {
      name: 'user4',
      address: 'stars1r98zsyt50k7yk86pf28xhdtf5yedkf7wm7nu0n',
      mnemonic:
        'follow motion improve audit hazard business decide long convince frame quality rug boil merry luxury robust whip soldier save ritual print screen border board',
    },
  ],
  denoms: [
    {
      description: 'Stride staked STARS',
      denomUnits: [
        {
          denom:
            'factory/stars16z43tjws3vw06ej9v7nrszu0ldsmn0eyjnjpu8/uststars',
          exponent: 0,
          aliases: ['microststars'],
        },
        {
          denom: 'ststars',
          exponent: 6,
          aliases: ['ststars'],
        },
      ],
      base: 'factory/stars16z43tjws3vw06ej9v7nrszu0ldsmn0eyjnjpu8/uststars',
      name: 'Stride Staked STARS',
      display: 'ststars',
      symbol: 'stSTARS',
      uri: 'https://raw.githubusercontent.com/cosmos/chain-registry/master/stride/images/ststars.png',
      uriHash: 'd41d8cd98f00b204e9800998ecf8427e', // Example SHA-256 hash
    },
    {
      description: 'A USD stablecoin issued by Circle',
      denomUnits: [
        {
          denom: 'factory/stars16z43tjws3vw06ej9v7nrszu0ldsmn0eyjnjpu8/uusdc',
          exponent: 0,
          aliases: ['microusdc'],
        },
        {
          denom: 'usdc',
          exponent: 6,
          aliases: ['usdc'],
        },
      ],
      base: 'factory/stars16z43tjws3vw06ej9v7nrszu0ldsmn0eyjnjpu8/uusdc',
      name: 'USDC',
      display: 'usdc',
      symbol: 'USDC',
      uri: 'https://raw.githubusercontent.com/cosmos/chain-registry/master/noble/images/USDCoin.png',
      uriHash: 'd41d8cd98f00b204e9800998ecf8427e', // Example SHA-256 hash
    },
    {
      description: 'DEX is the main token of the Decentralized Exchange.',
      denomUnits: [
        {
          denom: `factory/stars16z43tjws3vw06ej9v7nrszu0ldsmn0eyjnjpu8/udex`,
          exponent: 0,
          aliases: ['microdex'],
        },
        {
          denom: 'DEX',
          exponent: 6, // 1 DEX = 1,000,000 udex
          aliases: ['dex'],
        },
      ],
      base: `factory/stars16z43tjws3vw06ej9v7nrszu0ldsmn0eyjnjpu8/udex`,
      display: 'DEX',
      name: 'Decentralized Exchange Token',
      symbol: 'DEX',
      uri: 'https://example.com/token_info',
      uriHash: 'd41d8cd98f00b204e9800998ecf8427e', // Example SHA-256 hash
    },
    {
      description: 'The native coin of Sneaky Productions.',
      denomUnits: [
        {
          denom: 'factory/stars16z43tjws3vw06ej9v7nrszu0ldsmn0eyjnjpu8/usneaky',
          exponent: 0,
          aliases: ['microsneaky'],
        },
        {
          denom: 'sneaky',
          exponent: 6,
          aliases: ['sneaky'],
        },
      ],
      base: 'factory/stars16z43tjws3vw06ej9v7nrszu0ldsmn0eyjnjpu8/usneaky',
      name: 'Sneaky Productions',
      display: 'sneaky',
      symbol: 'SNEAKY',
      uri: 'https://example.com/token_info',
      uriHash: 'd41d8cd98f00b204e9800998ecf8427e', // Example SHA-256 hash
    },
  ],
}
