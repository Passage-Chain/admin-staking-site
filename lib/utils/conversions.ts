import _ from 'lodash'

export const displayAmountSimple = (amount: number) => {
  return amount / 10.0 ** 6
}

export const rawAmountSimple = (amount: string) => {
  return Number(amount) * 10 ** 6
}

export const parseBigIntString = (bigIntString: string) => {
  if (bigIntString.endsWith('n')) {
    const numericPart = bigIntString.slice(0, -1) // Remove the 'n' suffix
    return BigInt(numericPart) // Convert to BigInt
  } else {
    throw new Error('Invalid format: string must end with "n"')
  }
}

export const encodeB64 = (message: string) =>
  Buffer.from(message, 'binary').toString('base64')

export const decodeB64 = (message: string) =>
  Buffer.from(message, 'base64').toString('binary')

export const decodeB64Json = <T>(message: string): T =>
  JSON.parse(decodeB64(message))

export const percentToDecimal = (percent: number) => percent / 100

export const renderUsdValue = (value: number) =>
  value.toLocaleString(undefined, { style: 'currency', currency: 'USD' })

export const renderAmount = (value: number) =>
  value.toLocaleString(undefined, {
    maximumFractionDigits: 2,
  })
