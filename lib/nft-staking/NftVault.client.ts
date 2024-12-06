/**
* This file was automatically generated by @cosmwasm/ts-codegen@1.11.1.
* DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
* and run the @cosmwasm/ts-codegen generate command to regenerate this file.
*/

import { CosmWasmClient, SigningCosmWasmClient, ExecuteResult } from "@cosmjs/cosmwasm-stargate";
import { Coin, StdFee } from "@cosmjs/amino";
import { InstantiateMsg, ConfigForString, ExecuteMsg, ExecMsg, Timestamp, Uint64, RewardAsset, Addr, NftForString, QueryMsg, QueryMsg1, QueryBoundForTupleOfStringAndString, QueryBoundForString, QueryOptionsForTupleOfStringAndString, QueryOptionsForString, Expiration, ArrayOfClaim, Claim, NftForAddr, ConfigForAddr, ArrayOfAddr, NullableUint128, Uint128, ArrayOfTupleOfAddrAndUint64, ArrayOfStakedNft, StakedNft } from "./NftVault.types";
export interface NftVaultReadOnlyInterface {
  contractAddress: string;
  config: () => Promise<ConfigForAddr>;
  rewardAccounts: () => Promise<ArrayOfAddr>;
  usersStakedNfts: ({
    queryOptions,
    staker
  }: {
    queryOptions: QueryOptionsForTupleOfStringAndString;
    staker: string;
  }) => Promise<ArrayOfStakedNft>;
  usersCollectionStakedAmounts: ({
    queryOptions,
    staker
  }: {
    queryOptions: QueryOptionsForString;
    staker: string;
  }) => Promise<ArrayOfTupleOfAddrAndUint64>;
  totalStakedAmountAtHeight: ({
    height
  }: {
    height?: number;
  }) => Promise<NullableUint128>;
  claims: ({
    staker
  }: {
    staker: string;
  }) => Promise<ArrayOfClaim>;
}
export class NftVaultQueryClient implements NftVaultReadOnlyInterface {
  client: CosmWasmClient;
  contractAddress: string;
  constructor(client: CosmWasmClient, contractAddress: string) {
    this.client = client;
    this.contractAddress = contractAddress;
    this.config = this.config.bind(this);
    this.rewardAccounts = this.rewardAccounts.bind(this);
    this.usersStakedNfts = this.usersStakedNfts.bind(this);
    this.usersCollectionStakedAmounts = this.usersCollectionStakedAmounts.bind(this);
    this.totalStakedAmountAtHeight = this.totalStakedAmountAtHeight.bind(this);
    this.claims = this.claims.bind(this);
  }
  config = async (): Promise<ConfigForAddr> => {
    return this.client.queryContractSmart(this.contractAddress, {
      config: {}
    });
  };
  rewardAccounts = async (): Promise<ArrayOfAddr> => {
    return this.client.queryContractSmart(this.contractAddress, {
      reward_accounts: {}
    });
  };
  usersStakedNfts = async ({
    queryOptions,
    staker
  }: {
    queryOptions: QueryOptionsForTupleOfStringAndString;
    staker: string;
  }): Promise<ArrayOfStakedNft> => {
    return this.client.queryContractSmart(this.contractAddress, {
      users_staked_nfts: {
        query_options: queryOptions,
        staker
      }
    });
  };
  usersCollectionStakedAmounts = async ({
    queryOptions,
    staker
  }: {
    queryOptions: QueryOptionsForString;
    staker: string;
  }): Promise<ArrayOfTupleOfAddrAndUint64> => {
    return this.client.queryContractSmart(this.contractAddress, {
      users_collection_staked_amounts: {
        query_options: queryOptions,
        staker
      }
    });
  };
  totalStakedAmountAtHeight = async ({
    height
  }: {
    height?: number;
  }): Promise<NullableUint128> => {
    return this.client.queryContractSmart(this.contractAddress, {
      total_staked_amount_at_height: {
        height
      }
    });
  };
  claims = async ({
    staker
  }: {
    staker: string;
  }): Promise<ArrayOfClaim> => {
    return this.client.queryContractSmart(this.contractAddress, {
      claims: {
        staker
      }
    });
  };
}
export interface NftVaultInterface extends NftVaultReadOnlyInterface {
  contractAddress: string;
  sender: string;
  updateConfig: ({
    rewardsCodeId,
    unstakingDurationSec
  }: {
    rewardsCodeId?: number;
    unstakingDurationSec?: number;
  }, fee?: number | StdFee | "auto", memo?: string, _funds?: Coin[]) => Promise<ExecuteResult>;
  createRewardAccount: ({
    durationSec,
    label,
    periodStart,
    rewardAsset
  }: {
    durationSec: number;
    label: string;
    periodStart: Timestamp;
    rewardAsset: RewardAsset;
  }, fee?: number | StdFee | "auto", memo?: string, _funds?: Coin[]) => Promise<ExecuteResult>;
  stake: ({
    nfts
  }: {
    nfts: NftForString[];
  }, fee?: number | StdFee | "auto", memo?: string, _funds?: Coin[]) => Promise<ExecuteResult>;
  unstake: ({
    nfts
  }: {
    nfts: NftForString[];
  }, fee?: number | StdFee | "auto", memo?: string, _funds?: Coin[]) => Promise<ExecuteResult>;
  claim: ({
    recipient
  }: {
    recipient?: string;
  }, fee?: number | StdFee | "auto", memo?: string, _funds?: Coin[]) => Promise<ExecuteResult>;
  claimRewards: ({
    recipient
  }: {
    recipient?: string;
  }, fee?: number | StdFee | "auto", memo?: string, _funds?: Coin[]) => Promise<ExecuteResult>;
}
export class NftVaultClient extends NftVaultQueryClient implements NftVaultInterface {
  client: SigningCosmWasmClient;
  sender: string;
  contractAddress: string;
  constructor(client: SigningCosmWasmClient, sender: string, contractAddress: string) {
    super(client, contractAddress);
    this.client = client;
    this.sender = sender;
    this.contractAddress = contractAddress;
    this.updateConfig = this.updateConfig.bind(this);
    this.createRewardAccount = this.createRewardAccount.bind(this);
    this.stake = this.stake.bind(this);
    this.unstake = this.unstake.bind(this);
    this.claim = this.claim.bind(this);
    this.claimRewards = this.claimRewards.bind(this);
  }
  updateConfig = async ({
    rewardsCodeId,
    unstakingDurationSec
  }: {
    rewardsCodeId?: number;
    unstakingDurationSec?: number;
  }, fee: number | StdFee | "auto" = "auto", memo?: string, _funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      update_config: {
        rewards_code_id: rewardsCodeId,
        unstaking_duration_sec: unstakingDurationSec
      }
    }, fee, memo, _funds);
  };
  createRewardAccount = async ({
    durationSec,
    label,
    periodStart,
    rewardAsset
  }: {
    durationSec: number;
    label: string;
    periodStart: Timestamp;
    rewardAsset: RewardAsset;
  }, fee: number | StdFee | "auto" = "auto", memo?: string, _funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      create_reward_account: {
        duration_sec: durationSec,
        label,
        period_start: periodStart,
        reward_asset: rewardAsset
      }
    }, fee, memo, _funds);
  };
  stake = async ({
    nfts
  }: {
    nfts: NftForString[];
  }, fee: number | StdFee | "auto" = "auto", memo?: string, _funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      stake: {
        nfts
      }
    }, fee, memo, _funds);
  };
  unstake = async ({
    nfts
  }: {
    nfts: NftForString[];
  }, fee: number | StdFee | "auto" = "auto", memo?: string, _funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      unstake: {
        nfts
      }
    }, fee, memo, _funds);
  };
  claim = async ({
    recipient
  }: {
    recipient?: string;
  }, fee: number | StdFee | "auto" = "auto", memo?: string, _funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      claim: {
        recipient
      }
    }, fee, memo, _funds);
  };
  claimRewards = async ({
    recipient
  }: {
    recipient?: string;
  }, fee: number | StdFee | "auto" = "auto", memo?: string, _funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      claim_rewards: {
        recipient
      }
    }, fee, memo, _funds);
  };
}