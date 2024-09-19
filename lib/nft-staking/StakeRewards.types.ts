/**
* This file was automatically generated by @cosmwasm/ts-codegen@1.11.1.
* DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
* and run the @cosmwasm/ts-codegen generate command to regenerate this file.
*/

export interface InstantiateMsg {
  denom: string;
  duration_sec: number;
  stake: string;
}
export type ExecuteMsg = ExecMsg;
export type ExecMsg = {
  stake_change: {
    recipient: string;
    staked_amount: Uint128;
    total_staked: Uint128;
  };
} | {
  claim_rewards: {
    recipient: string;
    staked_amount: Uint128;
    total_staked: Uint128;
  };
};
export type Uint128 = string;
export type QueryMsg = QueryMsg1;
export type QueryMsg1 = {
  config: {};
} | {
  rewards: {};
} | {
  user_reward: {
    address: string;
  };
};
export type Timestamp = Uint64;
export type Uint64 = string;
export type Addr = string;
export interface Config {
  denom: string;
  duration_sec: number;
  period_finish: Timestamp;
  rewards_per_second: Uint128;
  stake: Addr;
}
export type Uint256 = string;
export interface CumulativeRewards {
  last_update: Timestamp;
  rewards_per_token: Uint256;
}
export type NullableUserReward = UserReward | null;
export interface UserReward {
  claimed_rewards: Uint128;
  pending_rewards: Uint128;
  rewards_checkpoint: Uint256;
}