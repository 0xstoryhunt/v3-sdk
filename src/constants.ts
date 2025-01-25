import DEFAULT_ADDRESS_LIST from '@storyhunt/default-list/build/storyhunt-default.constantlist.json';
import { ChainId } from '@storyhunt/sdk-core';

export const FACTORY_ADDRESS = DEFAULT_ADDRESS_LIST.constants[ChainId.ODYSSEY].V3_FACTORY_CONTRACT.address
export const DEPLOYER_ADDRESS = DEFAULT_ADDRESS_LIST.constants[ChainId.ODYSSEY].V3_POOL_DEPLOYER.address

export const ADDRESS_ZERO = '0x0000000000000000000000000000000000000000'
export const POOL_INIT_CODE_HASH = '0x5c1ebb91ef1669cb3e664cbf78650858b19d8a4247ca18abab152d5d4f1604db'

/**
 * The default factory enabled fee amounts, denominated in hundredths of bips.
 */
export enum FeeAmount {
  LOWEST = 100,
  LOW_200 = 200,
  LOW_300 = 300,
  LOW_400 = 400,
  LOW = 500,
  MEDIUM = 3000,
  HIGH = 10000
}

/**
 * The default factory tick spacings by fee amount.
 */
export const TICK_SPACINGS: { [amount in FeeAmount]: number } = {
  [FeeAmount.LOWEST]: 1,
  [FeeAmount.LOW_200]: 4,
  [FeeAmount.LOW_300]: 6,
  [FeeAmount.LOW_400]: 8,
  [FeeAmount.LOW]: 10,
  [FeeAmount.MEDIUM]: 60,
  [FeeAmount.HIGH]: 200
}
