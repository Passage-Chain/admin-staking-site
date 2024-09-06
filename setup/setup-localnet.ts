import { StardexCoinRegistryClient } from '@stargazezone/stardex-client/dist/types/StardexCoinRegistry.client'
import type { InstantiateMsg as StardexFactoryInstantiateMsg } from '@stargazezone/stardex-client/dist/types/StardexFactory.types'
import type { InstantiateMsg as StardexRouterInstantiateMsg } from '@stargazezone/stardex-client/dist/types/StardexRouter.types'
import { ChainContext } from '@uju-labs/cosmos-utils'
import _ from 'lodash'
import assert from 'assert'
import { testConfig } from './configs/localnet'
import { createPair, deregisterPair, provideLiquidity } from './utils/pair'

export const registerCoins = async (
  context: ChainContext,
  denoms: string[],
): Promise<void> => {
  const coinRegistryAddress = await context.expectContractAddress(
    ChainContext.buildContractKey(
      'stardex',
      'astroport-native-coin-registry',
      '1.0.1',
    ),
  )

  const adminUser = context.adminUser
  assert(adminUser, 'adminUser not found')

  const astroportCoinRegistryClient = new StardexCoinRegistryClient(
    adminUser.cwClient,
    adminUser.address,
    coinRegistryAddress,
  )

  await astroportCoinRegistryClient.add({
    nativeCoins: _.map(
      denoms,
      (denom) => [denom, 6] as unknown as [string, string],
    ),
  })

  context.childLogger.info(`Registered denoms: ${JSON.stringify(denoms)}`)
}

export const setupFactory = async (
  context: ChainContext,
  incentivesAddress?: string,
) => {
  const adminUser = context.adminUser
  assert(adminUser, 'adminUser not found')

  const tokenCodeId = context.getCodeId(
    ChainContext.buildContractKey('stardex', 'astroport-token', '1.1.1'),
  )

  const whitelistCodeId = 0

  const pairCodeId = context.getCodeId(
    ChainContext.buildContractKey('stardex', 'astroport-pair', '2.0.1'),
  )
  const pairStableCodeId = context.getCodeId(
    ChainContext.buildContractKey('stardex', 'astroport-pair-stable', '4.0.0'),
  )
  const pairConcentratedCodeId = context.getCodeId(
    ChainContext.buildContractKey(
      'stardex',
      'astroport-pair-concentrated',
      '4.0.1',
    ),
  )

  const coinRegistryAddress = await context.expectContractAddress(
    ChainContext.buildContractKey(
      'stardex',
      'astroport-native-coin-registry',
      '1.0.1',
    ),
  )

  const instantiateMsg: StardexFactoryInstantiateMsg = {
    token_code_id: tokenCodeId,
    whitelist_code_id: whitelistCodeId,
    coin_registry_address: coinRegistryAddress,
    owner: adminUser.address,
    pair_configs: [
      {
        code_id: pairCodeId,
        pair_type: {
          xyk: {},
        },
        total_fee_bps: 30,
        maker_fee_bps: 3333,
        is_disabled: false,
        is_generator_disabled: false,
      },
      {
        code_id: pairStableCodeId,
        pair_type: {
          stable: {},
        },
        total_fee_bps: 5,
        maker_fee_bps: 5000,
        is_disabled: false,
        is_generator_disabled: false,
      },
      {
        code_id: pairConcentratedCodeId,
        pair_type: {
          custom: 'concentrated',
        },
        total_fee_bps: 5,
        maker_fee_bps: 5000,
        is_disabled: false,
        is_generator_disabled: false,
      },
    ],
    generator_address: incentivesAddress,
    fee_address: null,
  }

  await context.instantiateContract(
    adminUser,
    ChainContext.buildContractKey('stardex', 'astroport-factory', '1.8.0'),
    instantiateMsg,
  )
}

export const setupRouter = async (context: ChainContext) => {
  const adminUser = context.adminUser
  assert(adminUser, 'adminUser not found')

  const factoryAddress = await context.expectContractAddress(
    ChainContext.buildContractKey('stardex', 'astroport-factory', '1.8.0'),
  )

  const instantiateMsg: StardexRouterInstantiateMsg = {
    astroport_factory: factoryAddress,
  }

  await context.instantiateContract(
    adminUser,
    ChainContext.buildContractKey('stardex', 'astroport-router', '1.2.1'),
    instantiateMsg,
  )
}

const setup = async (): Promise<void> => {
  const context = new ChainContext('stardex-indexer', testConfig, 'user0')
  await context.initialize()
  assert(context.adminUser, 'adminUser not found')

  const adminUser = context.adminUser
  assert(adminUser, 'adminUser not found')

  const denoms = [
    testConfig.denom,
    ..._.map(testConfig.denoms, (denom) => denom.base),
  ]

  await registerCoins(context, denoms)

  await setupFactory(context)
  await setupRouter(context)

  // Create ustars / uusdc pair, and provide liquidity
  const priceScale = 132.635
  const { pairAddress } = await createPair(
    context,
    [denoms[0], denoms[2]],
    { custom: 'concentrated' },
    {
      amp: '10',
      gamma: '0.000145',
      mid_fee: '0.0026',
      out_fee: '0.0045',
      fee_gamma: '0.00023',
      repeg_profit_threshold: '0.000002',
      min_price_scale_delta: '0.000146',
      ma_half_time: 600,
      price_scale: priceScale.toString(),
    },
  )
  const baseAmount = Number(1_000_000_000_000)
  const quoteAmount = Math.floor(baseAmount / priceScale)
  await provideLiquidity(context, pairAddress, [
    { denom: denoms[0], amount: baseAmount.toString() },
    { denom: denoms[2], amount: quoteAmount.toString() },
  ])

  // Create ustars / ststars LSD pair
  await createPair(
    context,
    [denoms[0], denoms[1]],
    { custom: 'concentrated' },
    {
      amp: '500',
      gamma: '0.01',
      mid_fee: '0.0003',
      out_fee: '0.0045',
      fee_gamma: '0.3',
      repeg_profit_threshold: '0.00000001',
      min_price_scale_delta: '0.0000055',
      ma_half_time: 600,
      price_scale: '1.5421',
    },
  )

  // Create meme xyk pair
  await createPair(
    context,
    [denoms[0], denoms[3]],
    { xyk: {} },
    { track_asset_balances: false },
  )

  // Create meme xyk pair and deregister
  await createPair(
    context,
    [denoms[0], denoms[4]],
    { xyk: {} },
    { track_asset_balances: false },
  )
  await deregisterPair(context, [denoms[0], denoms[4]])
}

setup().catch((err) => {
  console.error(err)
  process.exit(1)
})
