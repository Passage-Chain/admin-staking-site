import { Asset } from '@chain-registry/types'
import { Coin } from '@cosmjs/amino'
import _ from 'lodash'
import { shortenAddress } from '../utils/address'

export enum AssetSource {
  INTERNAL = 0,
  CHAIN_REGISTRY = 1,
  BANK_MODULE = 2,
}

export class PassageAsset {
  private baseBalance = 0

  constructor(
    public readonly asset: Asset,
    private source: AssetSource,
    private usdRate?: number,
  ) {}

  isHighlight = () => _.includes(this.asset.keywords || [], 'highlight')

  isRegistered = () => this.source <= 0

  getLogo = () => {
    return this.asset.logo_URIs?.png || this.asset.images?.[0]?.png
  }

  getLogoAlt = () => {
    return `${this.asset.display} Logo`
  }

  getBase = () => {
    return this.asset.base
  }

  getBaseShort = () => {
    const base = this.getBase()
    if (_.startsWith(base, 'factory/')) {
      const parts = _.split(base, '/')
      const middlePart = shortenAddress(parts[1])
      return `${parts[0]}/${middlePart}/${parts[2]}`
    } else if (_.startsWith(base, 'ibc/')) {
      const parts = _.split(base, '/')
      return `ibc/${shortenAddress(parts[1])}`
    }
    return base
  }

  getDisplay = () => {
    return this.asset.display
  }

  getLabel = () => this.asset.symbol || _.upperCase(this.asset.display)

  getSource = () => this.source

  getDisplayAmount = () => {
    const denomUnit = _.find(this.asset.denom_units, (denomUnit) => {
      return denomUnit.denom === this.asset.display
    })
    return denomUnit?.exponent
      ? this.baseBalance / 10.0 ** denomUnit.exponent
      : this.baseBalance
  }

  getBaseAmount = () => {
    return this.baseBalance
  }

  getUsdRate = () => {
    return this.usdRate
  }

  getUsdValue = () => {
    if (!this.usdRate) {
      return undefined
    }
    const displayAmount = this.getDisplayAmount()
    return Math.round(displayAmount * this.usdRate * 100) / 100
  }

  private setBalance = (denom: string, amount: number) => {
    const denomUnit = _.find(this.asset.denom_units, (denomUnit) => {
      return denomUnit.denom === denom
    })
    this.baseBalance = Math.floor(
      denomUnit?.exponent ? amount * 10.0 ** denomUnit.exponent : amount,
    )
  }

  setBaseBalance = (amount: number) => this.setBalance(this.getBase(), amount)

  setDisplayBalance = (amount: number) =>
    this.setBalance(this.getDisplay(), amount)

  setUsdRate = (rate: number) => (this.usdRate = rate)

  clone = () => new PassageAsset(this.asset, this.source, this.usdRate)

  toCoin = (): Coin => ({
    denom: this.getBase(),
    amount: this.getBaseAmount().toString(),
  })
}
