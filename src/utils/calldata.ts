import { BigintIsh } from '@storyhunt/sdk-core'
import JSBI from 'jsbi'

/**
 * Generated method parameters for executing a call.
 */
export interface MethodParameters {
  /**
   * The hex encoded calldata to perform the given operation
   */
  calldata: string
  /**
   * The amount of IP (wei) to send in hex.
   */
  value: string
}

/**
 * Converts a big int to a hex string
 * @param bigintIsh
 * @returns The hex encoded calldata
 */
export function toHex(bigintIsh: BigintIsh): string {
  const bigInt = JSBI.BigInt(bigintIsh)
  let hex = bigInt.toString(16)
  if (hex.length % 2 !== 0) {
    hex = `0${hex}`
  }
  return `0x${hex}`
}
