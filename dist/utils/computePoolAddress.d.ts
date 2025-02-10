import { Token } from '@storyhunt/sdk-core';
import { FeeAmount } from '../constants';
/**
 * Computes a pool address
 * @param factoryAddress The StoryHunt V3 factory address
 * @param tokenA The first token of the pair, irrespective of sort order
 * @param tokenB The second token of the pair, irrespective of sort order
 * @param fee The fee tier of the pool
 * @param initCodeHashManualOverride Override the init code hash used to compute the pool address if necessary
 * @param chainId
 * @returns The pool address
 */
export declare function computePoolAddress({ tokenA, tokenB, fee, deployerAddress, initCodeHash }: {
    tokenA: Token;
    tokenB: Token;
    fee: FeeAmount;
    deployerAddress: string;
    initCodeHash: string;
}): string;
