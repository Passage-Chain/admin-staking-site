/**
* This file was automatically generated by @cosmwasm/ts-codegen@1.11.1.
* DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
* and run the @cosmwasm/ts-codegen generate command to regenerate this file.
*/

import { UseQueryOptions, useQuery } from "react-query";
import { Timestamp, Uint64, InstantiateMsg, ExecuteMsg, ExecMsg, Uint128, QueryMsg, QueryMsg1, Addr, Config, Uint256, CumulativeRewards, NullableUserReward, UserReward } from "./StakeRewards.types";
import { StakeRewardsQueryClient } from "./StakeRewards.client";
export const stakeRewardsQueryKeys = {
  contract: ([{
    contract: "stakeRewards"
  }] as const),
  address: (contractAddress: string | undefined) => ([{
    ...stakeRewardsQueryKeys.contract[0],
    address: contractAddress
  }] as const),
  config: (contractAddress: string | undefined, args?: Record<string, unknown>) => ([{
    ...stakeRewardsQueryKeys.address(contractAddress)[0],
    method: "config",
    args
  }] as const),
  rewards: (contractAddress: string | undefined, args?: Record<string, unknown>) => ([{
    ...stakeRewardsQueryKeys.address(contractAddress)[0],
    method: "rewards",
    args
  }] as const),
  userReward: (contractAddress: string | undefined, args?: Record<string, unknown>) => ([{
    ...stakeRewardsQueryKeys.address(contractAddress)[0],
    method: "user_reward",
    args
  }] as const)
};
export const stakeRewardsQueries = {
  config: <TData = Config,>({
    client,
    options
  }: StakeRewardsConfigQuery<TData>): UseQueryOptions<Config, Error, TData> => ({
    queryKey: stakeRewardsQueryKeys.config(client?.contractAddress),
    queryFn: () => client ? client.config() : Promise.reject(new Error("Invalid client")),
    ...options,
    enabled: !!client && (options?.enabled != undefined ? options.enabled : true)
  }),
  rewards: <TData = CumulativeRewards,>({
    client,
    options
  }: StakeRewardsRewardsQuery<TData>): UseQueryOptions<CumulativeRewards, Error, TData> => ({
    queryKey: stakeRewardsQueryKeys.rewards(client?.contractAddress),
    queryFn: () => client ? client.rewards() : Promise.reject(new Error("Invalid client")),
    ...options,
    enabled: !!client && (options?.enabled != undefined ? options.enabled : true)
  }),
  userReward: <TData = NullableUserReward,>({
    client,
    args,
    options
  }: StakeRewardsUserRewardQuery<TData>): UseQueryOptions<NullableUserReward, Error, TData> => ({
    queryKey: stakeRewardsQueryKeys.userReward(client?.contractAddress, args),
    queryFn: () => client ? client.userReward({
      address: args.address
    }) : Promise.reject(new Error("Invalid client")),
    ...options,
    enabled: !!client && (options?.enabled != undefined ? options.enabled : true)
  })
};
export interface StakeRewardsReactQuery<TResponse, TData = TResponse> {
  client: StakeRewardsQueryClient | undefined;
  options?: UseQueryOptions<TResponse, Error, TData>;
}
export interface StakeRewardsUserRewardQuery<TData> extends StakeRewardsReactQuery<NullableUserReward, TData> {
  args: {
    address: string;
  };
}
export function useStakeRewardsUserRewardQuery<TData = NullableUserReward>({
  client,
  args,
  options
}: StakeRewardsUserRewardQuery<TData>) {
  return useQuery<NullableUserReward, Error, TData>(stakeRewardsQueryKeys.userReward(client?.contractAddress, args), () => client ? client.userReward({
    address: args.address
  }) : Promise.reject(new Error("Invalid client")), {
    ...options,
    enabled: !!client && (options?.enabled != undefined ? options.enabled : true)
  });
}
export interface StakeRewardsRewardsQuery<TData> extends StakeRewardsReactQuery<CumulativeRewards, TData> {}
export function useStakeRewardsRewardsQuery<TData = CumulativeRewards>({
  client,
  options
}: StakeRewardsRewardsQuery<TData>) {
  return useQuery<CumulativeRewards, Error, TData>(stakeRewardsQueryKeys.rewards(client?.contractAddress), () => client ? client.rewards() : Promise.reject(new Error("Invalid client")), {
    ...options,
    enabled: !!client && (options?.enabled != undefined ? options.enabled : true)
  });
}
export interface StakeRewardsConfigQuery<TData> extends StakeRewardsReactQuery<Config, TData> {}
export function useStakeRewardsConfigQuery<TData = Config>({
  client,
  options
}: StakeRewardsConfigQuery<TData>) {
  return useQuery<Config, Error, TData>(stakeRewardsQueryKeys.config(client?.contractAddress), () => client ? client.config() : Promise.reject(new Error("Invalid client")), {
    ...options,
    enabled: !!client && (options?.enabled != undefined ? options.enabled : true)
  });
}