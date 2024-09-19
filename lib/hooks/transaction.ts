import { useAccount, useCosmWasmSigningClient } from 'graz'
import { DeliverTxResponse } from '@cosmjs/stargate'
import { ExecuteResult } from '@cosmjs/cosmwasm-stargate'
import { GasPrice } from '@cosmjs/stargate'
import { sleep } from '../utils/wait'
import { toast } from 'sonner'
import { useBalances } from '../providers/balances'
import { useCallback } from 'react'
import { useCurrentChainInfo } from './chains'

const simplifyErrorMessage = (errorMsg: string): string => {
  // Extract the main error description
  const mainErrorMatch = errorMsg.match(/desc = (.*?)\[/)
  let mainError = mainErrorMatch ? mainErrorMatch[1].trim() : errorMsg

  // Further simplify the main error
  const specificErrorMatch = mainError.match(
    /(?:dispatch: submessages: )*(.+?)(?: \[|$)/,
  )
  if (specificErrorMatch) {
    mainError = specificErrorMatch[1].trim()
  }

  // Remove "failed to execute message; message index: 0: " if present
  mainError = mainError.replace(
    /^failed to execute message; message index: \d+: /,
    '',
  )
  mainError = mainError.replaceAll('dispatch: ', '')
  mainError = mainError.replaceAll('submessages: ', '')

  return mainError
}

export const useTx = () => {
  const { refreshBalances } = useBalances()

  const chainInfo = useCurrentChainInfo()
  const { data: account } = useAccount({ chainId: chainInfo.chainId })
  const { data: signingCwClient } = useCosmWasmSigningClient({
    chainId: chainInfo.chainId,
    opts: {
      gasPrice: GasPrice.fromString(
        `${chainInfo.feeCurrencies[0].gasPriceStep?.average}${chainInfo.feeCurrencies[0].coinMinimalDenom}`,
      ),
    },
  })

  const exec = useCallback(
    async (
      label: string,
      fn: (...args: any) => Promise<ExecuteResult | DeliverTxResponse>,
    ): Promise<ExecuteResult | DeliverTxResponse | undefined> => {
      try {
        const fnPromise = fn()
        await sleep(500)

        toast.message(`Processing ${label} transaction...`)

        const result = await fnPromise

        toast.success(`Successfully processed ${label} transaction`)

        refreshBalances && refreshBalances()

        return result
      } catch (e) {
        console.error(e)

        const mainError = simplifyErrorMessage((e as Error).message)
        toast.error(mainError)
      }
      return undefined
    },
    [refreshBalances, toast],
  )

  return {
    chainInfo,
    sender: account?.bech32Address,
    signingCwClient,
    exec,
  }
}
