import { Interface } from '@ethersproject/abi';
import { BigintIsh, Currency, Percent, TradeType } from '@storyhunt/sdk-core';
import { Trade } from './entities/trade';
import { PermitOptions } from './selfPermit';
import { MethodParameters } from './utils/calldata';
import { FeeOptions } from './payments';
/**
 * Options for producing the arguments to send calls to the router.
 */
export interface SwapOptions {
    /**
     * How much the execution price is allowed to move unfavorably from the trade execution price.
     */
    slippageTolerance: Percent;
    /**
     * The account that should receive the output.
     */
    recipient: string;
    /**
     * When the transaction expires, in epoch seconds.
     */
    deadline: BigintIsh;
    /**
     * The optional permit parameters for spending the input.
     */
    inputTokenPermit?: PermitOptions;
    /**
     * The optional price limit for the trade.
     */
    sqrtPriceLimitX96?: BigintIsh;
    /**
     * Optional information for taking a fee on output.
     */
    fee?: FeeOptions;
}
/**
 * Represents the StoryHunt V3 SwapRouter, and has static methods for helping execute trades.
 */
export declare abstract class SwapRouter {
    static INTERFACE: Interface;
    /**
     * Cannot be constructed.
     */
    private constructor();
    /**
     * Produces the on-chain method name to call and the hex encoded parameters to pass as arguments for a given trade.
     * @param trade to produce call parameters for
     * @param options options for the call parameters
     */
    static swapCallParameters(trades: Trade<Currency, Currency, TradeType> | Trade<Currency, Currency, TradeType>[], options: SwapOptions): MethodParameters;
}
