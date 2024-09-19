/**
* This file was automatically generated by @cosmwasm/ts-codegen@1.11.1.
* DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
* and run the @cosmwasm/ts-codegen generate command to regenerate this file.
*/

import { UseQueryOptions, useQuery } from "react-query";
import { InstantiateMsg, ExecuteMsg, ExecMsg, QueryMsg, QueryMsg1, QueryBoundForUint64, QueryOptionsForUint64, Addr, ArrayOfTupleOfUint64AndAddr } from "./VaultFactory.types";
import { VaultFactoryQueryClient } from "./VaultFactory.client";
export const vaultFactoryQueryKeys = {
  contract: ([{
    contract: "vaultFactory"
  }] as const),
  address: (contractAddress: string | undefined) => ([{
    ...vaultFactoryQueryKeys.contract[0],
    address: contractAddress
  }] as const),
  vaults: (contractAddress: string | undefined, args?: Record<string, unknown>) => ([{
    ...vaultFactoryQueryKeys.address(contractAddress)[0],
    method: "vaults",
    args
  }] as const)
};
export const vaultFactoryQueries = {
  vaults: <TData = ArrayOfTupleOfUint64AndAddr,>({
    client,
    args,
    options
  }: VaultFactoryVaultsQuery<TData>): UseQueryOptions<ArrayOfTupleOfUint64AndAddr, Error, TData> => ({
    queryKey: vaultFactoryQueryKeys.vaults(client?.contractAddress, args),
    queryFn: () => client ? client.vaults({
      queryOptions: args.queryOptions
    }) : Promise.reject(new Error("Invalid client")),
    ...options,
    enabled: !!client && (options?.enabled != undefined ? options.enabled : true)
  })
};
export interface VaultFactoryReactQuery<TResponse, TData = TResponse> {
  client: VaultFactoryQueryClient | undefined;
  options?: UseQueryOptions<TResponse, Error, TData>;
}
export interface VaultFactoryVaultsQuery<TData> extends VaultFactoryReactQuery<ArrayOfTupleOfUint64AndAddr, TData> {
  args: {
    queryOptions: QueryOptions_for_uint64;
  };
}
export function useVaultFactoryVaultsQuery<TData = ArrayOfTupleOfUint64AndAddr>({
  client,
  args,
  options
}: VaultFactoryVaultsQuery<TData>) {
  return useQuery<ArrayOfTupleOfUint64AndAddr, Error, TData>(vaultFactoryQueryKeys.vaults(client?.contractAddress, args), () => client ? client.vaults({
    queryOptions: args.queryOptions
  }) : Promise.reject(new Error("Invalid client")), {
    ...options,
    enabled: !!client && (options?.enabled != undefined ? options.enabled : true)
  });
}