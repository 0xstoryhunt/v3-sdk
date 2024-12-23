export const FACTORY_ADDRESS = '0x354631ac8fdb2d5d66Ca5809b78BCE9dda1b7973'

export const ADDRESS_ZERO = '0x0000000000000000000000000000000000000000'
export const POOL_INIT_CODE_HASH = '0x5cea2eb9879ca53b37c03e28e630340a0e2b1575e3df2ba4b38a11af3946ac92'

export function poolInitCodeHash(): string {
  return POOL_INIT_CODE_HASH
}

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
