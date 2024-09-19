import { CosmWasmClient } from '@cosmjs/cosmwasm-stargate'

export const fetchAllTokenIdsByOwner = async (
  cosmWasmClient: CosmWasmClient,
  collectionAddress: string,
  owner: string,
): Promise<string[]> => {
  const tokenIds: string[] = []

  const limit = 20
  let responseLength = limit

  while (responseLength === limit) {
    const response = await cosmWasmClient.queryContractSmart(
      collectionAddress,
      { tokens: { owner, limit, start_after: tokenIds.at(-1) } },
    )
    tokenIds.push(...response.tokens)
    responseLength = response.tokens.length
  }

  return tokenIds
}
