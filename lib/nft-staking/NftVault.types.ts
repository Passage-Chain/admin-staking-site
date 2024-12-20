/**
* This file was automatically generated by @cosmwasm/ts-codegen@1.11.1.
* DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
* and run the @cosmwasm/ts-codegen generate command to regenerate this file.
*/

export interface InstantiateMsg {
  config: ConfigForString;
}
export interface ConfigForString {
  collections: string[];
  rewards_code_id: number;
  unstaking_duration_sec: number;
}
export type ExecuteMsg = ExecMsg;
export type ExecMsg = {
  update_config: {
    rewards_code_id?: number | null;
    unstaking_duration_sec?: number | null;
  };
} | {
  create_reward_account: {
    duration_sec: number;
    label: string;
    period_start: Timestamp;
    reward_asset: RewardAsset;
  };
} | {
  stake: {
    nfts: NftForString[];
  };
} | {
  unstake: {
    nfts: NftForString[];
  };
} | {
  claim: {
    recipient?: string | null;
  };
} | {
  claim_rewards: {
    recipient?: string | null;
  };
};
export type Timestamp = Uint64;
export type Uint64 = string;
export type RewardAsset = {
  native: string;
} | {
  cw20: Addr;
};
export type Addr = string;
export interface NftForString {
  collection: string;
  token_id: string;
}
export type QueryMsg = QueryMsg1;
export type QueryMsg1 = {
  config: {};
} | {
  reward_accounts: {};
} | {
  users_staked_nfts: {
    query_options: QueryOptionsForTupleOfStringAndString;
    staker: string;
  };
} | {
  users_collection_staked_amounts: {
    query_options: QueryOptionsForString;
    staker: string;
  };
} | {
  total_staked_amount_at_height: {
    height?: number | null;
  };
} | {
  claims: {
    staker: string;
  };
};
export type QueryBoundForTupleOfStringAndString = {
  inclusive: [string, string];
} | {
  exclusive: [string, string];
};
export type QueryBoundForString = {
  inclusive: string;
} | {
  exclusive: string;
};
export interface QueryOptionsForTupleOfStringAndString {
  descending?: boolean | null;
  limit?: number | null;
  max?: QueryBoundForTupleOfStringAndString | null;
  min?: QueryBoundForTupleOfStringAndString | null;
}
export interface QueryOptionsForString {
  descending?: boolean | null;
  limit?: number | null;
  max?: QueryBoundForString | null;
  min?: QueryBoundForString | null;
}
export type Expiration = {
  at_height: number;
} | {
  at_time: Timestamp;
} | {
  never: {};
};
export type ArrayOfClaim = Claim[];
export interface Claim {
  nfts: NftForAddr[];
  release_at: Expiration;
}
export interface NftForAddr {
  collection: Addr;
  token_id: string;
}
export interface ConfigForAddr {
  collections: Addr[];
  rewards_code_id: number;
  unstaking_duration_sec: number;
}
export type ArrayOfAddr = Addr[];
export type NullableUint128 = Uint128 | null;
export type Uint128 = string;
export type ArrayOfTupleOfAddrAndUint64 = [Addr, number][];
export type ArrayOfStakedNft = StakedNft[];
export interface StakedNft {
  nft: NftForAddr;
  staker: Addr;
}