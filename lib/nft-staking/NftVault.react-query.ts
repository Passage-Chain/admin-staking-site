/**
* This file was automatically generated by @cosmwasm/ts-codegen@1.11.1.
* DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
* and run the @cosmwasm/ts-codegen generate command to regenerate this file.
*/

import { UseQueryOptions, useQuery } from "react-query";
import { InstantiateMsg, ConfigForString, ExecuteMsg, ExecMsg, NftForString, QueryMsg, QueryMsg1, QueryBoundForTupleOfStringAndString, QueryBoundForString, QueryOptionsForTupleOfStringAndString, QueryOptionsForString, Addr, Expiration, Timestamp, Uint64, ArrayOfClaim, Claim, NftForAddr, ConfigForAddr, ArrayOfAddr, NullableUint128, Uint128, ArrayOfTupleOfAddrAndUint64, ArrayOfStakedNft, StakedNft } from "./NftVault.types";
import { NftVaultQueryClient } from "./NftVault.client";
export const nftVaultQueryKeys = {
  contract: ([{
    contract: "nftVault"
  }] as const),
  address: (contractAddress: string | undefined) => ([{
    ...nftVaultQueryKeys.contract[0],
    address: contractAddress
  }] as const),
  config: (contractAddress: string | undefined, args?: Record<string, unknown>) => ([{
    ...nftVaultQueryKeys.address(contractAddress)[0],
    method: "config",
    args
  }] as const),
  rewardAccounts: (contractAddress: string | undefined, args?: Record<string, unknown>) => ([{
    ...nftVaultQueryKeys.address(contractAddress)[0],
    method: "reward_accounts",
    args
  }] as const),
  usersStakedNfts: (contractAddress: string | undefined, args?: Record<string, unknown>) => ([{
    ...nftVaultQueryKeys.address(contractAddress)[0],
    method: "users_staked_nfts",
    args
  }] as const),
  usersCollectionStakedAmounts: (contractAddress: string | undefined, args?: Record<string, unknown>) => ([{
    ...nftVaultQueryKeys.address(contractAddress)[0],
    method: "users_collection_staked_amounts",
    args
  }] as const),
  totalStakedAmountAtHeight: (contractAddress: string | undefined, args?: Record<string, unknown>) => ([{
    ...nftVaultQueryKeys.address(contractAddress)[0],
    method: "total_staked_amount_at_height",
    args
  }] as const),
  claims: (contractAddress: string | undefined, args?: Record<string, unknown>) => ([{
    ...nftVaultQueryKeys.address(contractAddress)[0],
    method: "claims",
    args
  }] as const)
};
export const nftVaultQueries = {
  config: <TData = ConfigForAddr,>({
    client,
    options
  }: NftVaultConfigQuery<TData>): UseQueryOptions<ConfigForAddr, Error, TData> => ({
    queryKey: nftVaultQueryKeys.config(client?.contractAddress),
    queryFn: () => client ? client.config() : Promise.reject(new Error("Invalid client")),
    ...options,
    enabled: !!client && (options?.enabled != undefined ? options.enabled : true)
  }),
  rewardAccounts: <TData = ArrayOfAddr,>({
    client,
    options
  }: NftVaultRewardAccountsQuery<TData>): UseQueryOptions<ArrayOfAddr, Error, TData> => ({
    queryKey: nftVaultQueryKeys.rewardAccounts(client?.contractAddress),
    queryFn: () => client ? client.rewardAccounts() : Promise.reject(new Error("Invalid client")),
    ...options,
    enabled: !!client && (options?.enabled != undefined ? options.enabled : true)
  }),
  usersStakedNfts: <TData = ArrayOfStakedNft,>({
    client,
    args,
    options
  }: NftVaultUsersStakedNftsQuery<TData>): UseQueryOptions<ArrayOfStakedNft, Error, TData> => ({
    queryKey: nftVaultQueryKeys.usersStakedNfts(client?.contractAddress, args),
    queryFn: () => client ? client.usersStakedNfts({
      queryOptions: args.queryOptions,
      staker: args.staker
    }) : Promise.reject(new Error("Invalid client")),
    ...options,
    enabled: !!client && (options?.enabled != undefined ? options.enabled : true)
  }),
  usersCollectionStakedAmounts: <TData = ArrayOfTupleOfAddrAndUint64,>({
    client,
    args,
    options
  }: NftVaultUsersCollectionStakedAmountsQuery<TData>): UseQueryOptions<ArrayOfTupleOfAddrAndUint64, Error, TData> => ({
    queryKey: nftVaultQueryKeys.usersCollectionStakedAmounts(client?.contractAddress, args),
    queryFn: () => client ? client.usersCollectionStakedAmounts({
      queryOptions: args.queryOptions,
      staker: args.staker
    }) : Promise.reject(new Error("Invalid client")),
    ...options,
    enabled: !!client && (options?.enabled != undefined ? options.enabled : true)
  }),
  totalStakedAmountAtHeight: <TData = NullableUint128,>({
    client,
    args,
    options
  }: NftVaultTotalStakedAmountAtHeightQuery<TData>): UseQueryOptions<NullableUint128, Error, TData> => ({
    queryKey: nftVaultQueryKeys.totalStakedAmountAtHeight(client?.contractAddress, args),
    queryFn: () => client ? client.totalStakedAmountAtHeight({
      height: args.height
    }) : Promise.reject(new Error("Invalid client")),
    ...options,
    enabled: !!client && (options?.enabled != undefined ? options.enabled : true)
  }),
  claims: <TData = ArrayOfClaim,>({
    client,
    args,
    options
  }: NftVaultClaimsQuery<TData>): UseQueryOptions<ArrayOfClaim, Error, TData> => ({
    queryKey: nftVaultQueryKeys.claims(client?.contractAddress, args),
    queryFn: () => client ? client.claims({
      staker: args.staker
    }) : Promise.reject(new Error("Invalid client")),
    ...options,
    enabled: !!client && (options?.enabled != undefined ? options.enabled : true)
  })
};
export interface NftVaultReactQuery<TResponse, TData = TResponse> {
  client: NftVaultQueryClient | undefined;
  options?: UseQueryOptions<TResponse, Error, TData>;
}
export interface NftVaultClaimsQuery<TData> extends NftVaultReactQuery<ArrayOfClaim, TData> {
  args: {
    staker: string;
  };
}
export function useNftVaultClaimsQuery<TData = ArrayOfClaim>({
  client,
  args,
  options
}: NftVaultClaimsQuery<TData>) {
  return useQuery<ArrayOfClaim, Error, TData>(nftVaultQueryKeys.claims(client?.contractAddress, args), () => client ? client.claims({
    staker: args.staker
  }) : Promise.reject(new Error("Invalid client")), {
    ...options,
    enabled: !!client && (options?.enabled != undefined ? options.enabled : true)
  });
}
export interface NftVaultTotalStakedAmountAtHeightQuery<TData> extends NftVaultReactQuery<NullableUint128, TData> {
  args: {
    height?: number;
  };
}
export function useNftVaultTotalStakedAmountAtHeightQuery<TData = NullableUint128>({
  client,
  args,
  options
}: NftVaultTotalStakedAmountAtHeightQuery<TData>) {
  return useQuery<NullableUint128, Error, TData>(nftVaultQueryKeys.totalStakedAmountAtHeight(client?.contractAddress, args), () => client ? client.totalStakedAmountAtHeight({
    height: args.height
  }) : Promise.reject(new Error("Invalid client")), {
    ...options,
    enabled: !!client && (options?.enabled != undefined ? options.enabled : true)
  });
}
export interface NftVaultUsersCollectionStakedAmountsQuery<TData> extends NftVaultReactQuery<ArrayOfTupleOfAddrAndUint64, TData> {
  args: {
    queryOptions: QueryOptionsForString;
    staker: string;
  };
}
export function useNftVaultUsersCollectionStakedAmountsQuery<TData = ArrayOfTupleOfAddrAndUint64>({
  client,
  args,
  options
}: NftVaultUsersCollectionStakedAmountsQuery<TData>) {
  return useQuery<ArrayOfTupleOfAddrAndUint64, Error, TData>(nftVaultQueryKeys.usersCollectionStakedAmounts(client?.contractAddress, args), () => client ? client.usersCollectionStakedAmounts({
    queryOptions: args.queryOptions,
    staker: args.staker
  }) : Promise.reject(new Error("Invalid client")), {
    ...options,
    enabled: !!client && (options?.enabled != undefined ? options.enabled : true)
  });
}
export interface NftVaultUsersStakedNftsQuery<TData> extends NftVaultReactQuery<ArrayOfStakedNft, TData> {
  args: {
    queryOptions: QueryOptionsForTupleOfStringAndString;
    staker: string;
  };
}
export function useNftVaultUsersStakedNftsQuery<TData = ArrayOfStakedNft>({
  client,
  args,
  options
}: NftVaultUsersStakedNftsQuery<TData>) {
  return useQuery<ArrayOfStakedNft, Error, TData>(nftVaultQueryKeys.usersStakedNfts(client?.contractAddress, args), () => client ? client.usersStakedNfts({
    queryOptions: args.queryOptions,
    staker: args.staker
  }) : Promise.reject(new Error("Invalid client")), {
    ...options,
    enabled: !!client && (options?.enabled != undefined ? options.enabled : true)
  });
}
export interface NftVaultRewardAccountsQuery<TData> extends NftVaultReactQuery<ArrayOfAddr, TData> {}
export function useNftVaultRewardAccountsQuery<TData = ArrayOfAddr>({
  client,
  options
}: NftVaultRewardAccountsQuery<TData>) {
  return useQuery<ArrayOfAddr, Error, TData>(nftVaultQueryKeys.rewardAccounts(client?.contractAddress), () => client ? client.rewardAccounts() : Promise.reject(new Error("Invalid client")), {
    ...options,
    enabled: !!client && (options?.enabled != undefined ? options.enabled : true)
  });
}
export interface NftVaultConfigQuery<TData> extends NftVaultReactQuery<ConfigForAddr, TData> {}
export function useNftVaultConfigQuery<TData = ConfigForAddr>({
  client,
  options
}: NftVaultConfigQuery<TData>) {
  return useQuery<ConfigForAddr, Error, TData>(nftVaultQueryKeys.config(client?.contractAddress), () => client ? client.config() : Promise.reject(new Error("Invalid client")), {
    ...options,
    enabled: !!client && (options?.enabled != undefined ? options.enabled : true)
  });
}