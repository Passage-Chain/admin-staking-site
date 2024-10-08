/**
* This file was automatically generated by @cosmwasm/ts-codegen@1.11.1.
* DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
* and run the @cosmwasm/ts-codegen generate command to regenerate this file.
*/

import { CosmWasmClient, SigningCosmWasmClient, ExecuteResult } from "@cosmjs/cosmwasm-stargate";
import { Coin, StdFee } from "@cosmjs/amino";
import { InstantiateMsg, ExecuteMsg, ExecMsg, QueryMsg, QueryMsg1, QueryBoundForUint64, QueryOptionsForUint64, Addr, ArrayOfTupleOfUint64AndAddr } from "./VaultFactory.types";
export interface VaultFactoryReadOnlyInterface {
  contractAddress: string;
  vaults: ({
    queryOptions
  }: {
    queryOptions: QueryOptions_for_uint64;
  }) => Promise<ArrayOfTupleOfUint64AndAddr>;
}
export class VaultFactoryQueryClient implements VaultFactoryReadOnlyInterface {
  client: CosmWasmClient;
  contractAddress: string;
  constructor(client: CosmWasmClient, contractAddress: string) {
    this.client = client;
    this.contractAddress = contractAddress;
    this.vaults = this.vaults.bind(this);
  }
  vaults = async ({
    queryOptions
  }: {
    queryOptions: QueryOptions_for_uint64;
  }): Promise<ArrayOfTupleOfUint64AndAddr> => {
    return this.client.queryContractSmart(this.contractAddress, {
      vaults: {
        query_options: queryOptions
      }
    });
  };
}
export interface VaultFactoryInterface extends VaultFactoryReadOnlyInterface {
  contractAddress: string;
  sender: string;
  updateConfig: ({
    rewardsCodeId,
    vaultCodeId
  }: {
    rewardsCodeId?: number;
    vaultCodeId?: number;
  }, fee?: number | StdFee | "auto", memo?: string, _funds?: Coin[]) => Promise<ExecuteResult>;
  createVault: ({
    collections,
    unstakingDurationSec,
    vaultLabel
  }: {
    collections: string[];
    unstakingDurationSec: number;
    vaultLabel: string;
  }, fee?: number | StdFee | "auto", memo?: string, _funds?: Coin[]) => Promise<ExecuteResult>;
}
export class VaultFactoryClient extends VaultFactoryQueryClient implements VaultFactoryInterface {
  client: SigningCosmWasmClient;
  sender: string;
  contractAddress: string;
  constructor(client: SigningCosmWasmClient, sender: string, contractAddress: string) {
    super(client, contractAddress);
    this.client = client;
    this.sender = sender;
    this.contractAddress = contractAddress;
    this.updateConfig = this.updateConfig.bind(this);
    this.createVault = this.createVault.bind(this);
  }
  updateConfig = async ({
    rewardsCodeId,
    vaultCodeId
  }: {
    rewardsCodeId?: number;
    vaultCodeId?: number;
  }, fee: number | StdFee | "auto" = "auto", memo?: string, _funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      update_config: {
        rewards_code_id: rewardsCodeId,
        vault_code_id: vaultCodeId
      }
    }, fee, memo, _funds);
  };
  createVault = async ({
    collections,
    unstakingDurationSec,
    vaultLabel
  }: {
    collections: string[];
    unstakingDurationSec: number;
    vaultLabel: string;
  }, fee: number | StdFee | "auto" = "auto", memo?: string, _funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      create_vault: {
        collections,
        unstaking_duration_sec: unstakingDurationSec,
        vault_label: vaultLabel
      }
    }, fee, memo, _funds);
  };
}