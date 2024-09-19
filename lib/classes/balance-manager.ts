import { Coin } from '@cosmjs/stargate'
import _ from 'lodash'

export class BalanceManager {
  private balanceMap: Record<string, number>
  private lpMap: Record<string, number>

  constructor(public balances: readonly Coin[]) {
    this.balanceMap = {}
    this.lpMap = {}

    _.forEach(balances, (balance) => {
      this.balanceMap[balance.denom] = Number(balance.amount)
    })
  }

  getBalance = (denom: string) => this.balanceMap[denom] || 0

  getLpBalance = (address: string) => this.lpMap[address] || 0

  getLpPairs = () => _.keys(this.lpMap)
}
