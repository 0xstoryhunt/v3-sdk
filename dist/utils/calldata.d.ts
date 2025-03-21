import { BigintIsh } from '@storyhunt/sdk-core';
/**
 * Generated method parameters for executing a call.
 */
export interface MethodParameters {
    /**
     * The hex encoded calldata to perform the given operation
     */
    calldata: string;
    /**
     * The amount of IP (wei) to send in hex.
     */
    value: string;
}
/**
 * Converts a big int to a hex string
 * @param bigintIsh
 * @returns The hex encoded calldata
 */
export declare function toHex(bigintIsh: BigintIsh): string;
