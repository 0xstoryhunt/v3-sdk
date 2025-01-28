import { BigintIsh, CurrencyAmount, Token, validateAndParseAddress } from '@storyhunt/sdk-core'
import invariant from 'tiny-invariant'
import { ADDRESS_ZERO } from './constants'
import { Position } from './entities'
import { Multicall } from './multicall'
import alphaHunterV3Abi from './interfaces/IAlphaHunterV3.json'
import { ONE, ZERO } from './internalConstants'
import {
  AddLiquidityOptions,
  isMint,
  CollectOptions,
  MaxUint128,
  RemoveLiquidityOptions
} from './nonfungiblePositionManager'
import { Payments } from './payments'
import { SelfPermit } from './selfPermit'
import { MethodParameters, toHex } from './utils'
import { Interface } from '@ethersproject/abi'
import JSBI from 'jsbi'

interface WidthDrawOptions {
  tokenId: BigintIsh
  to: string
}

interface HarvestOptions {
  tokenId: BigintIsh
  to: string
}

export abstract class AlphaHunterV3 {
  public static ABI = alphaHunterV3Abi
  public static INTERFACE: Interface = new Interface(alphaHunterV3Abi.abi)

  /**
   * Cannot be constructed.
   */
  // eslint-disable-next-line
  private constructor() {}

  // Copy from NonfungiblePositionManager
  // Only support increaseLiquidity
  public static addCallParameters(position: Position, options: AddLiquidityOptions): MethodParameters {
    invariant(position.liquidity > ZERO, 'ZERO_LIQUIDITY')

    const calldatas: string[] = []

    // get amounts
    const { amount0: amount0Desired, amount1: amount1Desired } = position.mintAmounts

    // adjust for slippage
    const minimumAmounts = position.mintAmountsWithSlippage(options.slippageTolerance)
    const amount0Min = toHex(minimumAmounts.amount0)
    const amount1Min = toHex(minimumAmounts.amount1)

    const deadline = toHex(options.deadline)

    invariant(!isMint(options), 'NO_MINT_SUPPORT')

    // permits if necessary
    if (options.token0Permit) {
      calldatas.push(SelfPermit.encodePermit(position.pool.token0, options.token0Permit))
    }
    if (options.token1Permit) {
      calldatas.push(SelfPermit.encodePermit(position.pool.token1, options.token1Permit))
    }

    // increase
    calldatas.push(
      AlphaHunterV3.INTERFACE.encodeFunctionData('increaseLiquidity', [
        {
          tokenId: toHex(options.tokenId),
          amount0Desired: toHex(amount0Desired),
          amount1Desired: toHex(amount1Desired),
          amount0Min,
          amount1Min,
          deadline
        }
      ])
    )

    let value: string = toHex(0)

    if (options.useNative) {
      const wrapped = options.useNative.wrapped
      invariant(position.pool.token0.equals(wrapped) || position.pool.token1.equals(wrapped), 'NO_WIP')

      const wrappedValue = position.pool.token0.equals(wrapped) ? amount0Desired : amount1Desired

      // we only need to refund if we're actually sending IP
      if (JSBI.greaterThan(wrappedValue, ZERO)) {
        calldatas.push(Payments.encodeRefundIP())
      }

      value = toHex(wrappedValue)
    }

    return {
      calldata: Multicall.encodeMulticall(calldatas),
      value
    }
  }

  // Copy from NonfungiblePositionManager
  private static encodeCollect(options: CollectOptions): string[] {
    const calldatas: string[] = []

    const tokenId = toHex(options.tokenId)

    const involvesIP =
      options.expectedCurrencyOwed0.currency.isNative || options.expectedCurrencyOwed1.currency.isNative

    const recipient = validateAndParseAddress(options.recipient)

    calldatas.push(
      AlphaHunterV3.INTERFACE.encodeFunctionData('collect', [
        {
          tokenId,
          recipient: involvesIP ? ADDRESS_ZERO : recipient,
          amount0Max: MaxUint128,
          amount1Max: MaxUint128
        }
      ])
    )

    if (involvesIP) {
      const IPAmount = options.expectedCurrencyOwed0.currency.isNative
        ? options.expectedCurrencyOwed0.quotient
        : options.expectedCurrencyOwed1.quotient
      const token = options.expectedCurrencyOwed0.currency.isNative
        ? (options.expectedCurrencyOwed1.currency as Token)
        : (options.expectedCurrencyOwed0.currency as Token)
      const tokenAmount = options.expectedCurrencyOwed0.currency.isNative
        ? options.expectedCurrencyOwed1.quotient
        : options.expectedCurrencyOwed0.quotient

      calldatas.push(Payments.encodeUnwrapWIP9(IPAmount, recipient))
      calldatas.push(Payments.encodeSweepToken(token, tokenAmount, recipient))
    }

    return calldatas
  }

  public static collectCallParameters(options: CollectOptions): MethodParameters {
    const calldatas: string[] = AlphaHunterV3.encodeCollect(options)

    return {
      calldata: Multicall.encodeMulticall(calldatas),
      value: toHex(0)
    }
  }

  public static removeCallParameters(position: Position, options: RemoveLiquidityOptions): MethodParameters {
    const calldatas: string[] = []

    const deadline = toHex(options.deadline)
    const tokenId = toHex(options.tokenId)

    // construct a partial position with a percentage of liquidity
    const partialPosition = new Position({
      pool: position.pool,
      liquidity: options.liquidityPercentage.multiply(position.liquidity).quotient,
      tickLower: position.tickLower,
      tickUpper: position.tickUpper
    })
    invariant(partialPosition.liquidity > ZERO, 'ZERO_LIQUIDITY')

    // slippage-adjusted underlying amounts
    // const { amount0: amount0Min, amount1: amount1Min } = partialPosition.burnAmountsWithSlippage(
    //   options.slippageTolerance
    // )

    const amount0Min = JSBI.BigInt(0)
    const amount1Min = JSBI.BigInt(0)

    if (options.permit) {
      calldatas.push(
        AlphaHunterV3.INTERFACE.encodeFunctionData('permit', [
          validateAndParseAddress(options.permit.spender),
          tokenId,
          toHex(options.permit.deadline),
          options.permit.v,
          options.permit.r,
          options.permit.s
        ])
      )
    }

    const params = {
      tokenId,
      liquidity: toHex(partialPosition.liquidity),
      amount0Min: toHex(amount0Min),
      amount1Min: toHex(amount1Min),
      deadline
    }

    console.log(options);
    console.log(position);
    console.log(params);

    // remove liquidity
    calldatas.push(AlphaHunterV3.INTERFACE.encodeFunctionData('decreaseLiquidity', [params]))

    const { expectedCurrencyOwed0, expectedCurrencyOwed1, ...rest } = options.collectOptions
    calldatas.push(
      ...AlphaHunterV3.encodeCollect({
        tokenId: toHex(options.tokenId),
        // add the underlying value to the expected currency already owed
        expectedCurrencyOwed0: expectedCurrencyOwed0.add(
          CurrencyAmount.fromRawAmount(expectedCurrencyOwed0.currency, amount0Min)
        ),
        expectedCurrencyOwed1: expectedCurrencyOwed1.add(
          CurrencyAmount.fromRawAmount(expectedCurrencyOwed1.currency, amount1Min)
        ),
        ...rest
      })
    )

    // if (rest?.recipient) {
    //   if (options.liquidityPercentage.equalTo(ONE)) {
    //     calldatas.push(
    //       AlphaHunterV3.INTERFACE.encodeFunctionData('withdraw',[tokenId, validateAndParseAddress(rest?.recipient)])
    //     )
    //   } else {
    //     calldatas.push(
    //       AlphaHunterV3.INTERFACE.encodeFunctionData('harvest',[tokenId, validateAndParseAddress(rest?.recipient)])
    //     )
    //   }
    // }

    if (options.liquidityPercentage.equalTo(ONE)) {
      if (options.burnToken) {
        calldatas.push(AlphaHunterV3.INTERFACE.encodeFunctionData('burn', [tokenId]))
      }
    } else {
      invariant(options.burnToken !== true, 'CANNOT_BURN')
    }

    return {
      calldata: Multicall.encodeMulticall(calldatas),
      value: toHex(0)
    }
  }

  // public static updateCallParameters() {}

  public static harvestCallParameters(options: HarvestOptions) {
    const calldatas: string[] = this.encodeHarvest(options)

    return {
      calldata: Multicall.encodeMulticall(calldatas),
      value: toHex(0)
    }
  }

  public static batchHarvestCallParameters(options: HarvestOptions[]) {
    const calldatas: string[] = options.map(option => this.encodeHarvest(option)).flat()

    return {
      calldata: Multicall.encodeMulticall(calldatas),
      value: toHex(0)
    }
  }

  public static encodeHarvest(options: HarvestOptions) {
    const { tokenId, to } = options

    const calldatas: string[] = []

    // harvest pendingHunt
    calldatas.push(AlphaHunterV3.INTERFACE.encodeFunctionData('harvest', [toHex(tokenId), validateAndParseAddress(to)]))

    return calldatas
  }

  public static withdrawCallParameters(options: WidthDrawOptions) {
    const { tokenId, to } = options

    const calldatas: string[] = []

    // withdraw liquidity
    calldatas.push(
      AlphaHunterV3.INTERFACE.encodeFunctionData('withdraw', [toHex(tokenId), validateAndParseAddress(to)])
    )

    return {
      calldata: Multicall.encodeMulticall(calldatas),
      value: toHex(0)
    }
  }
}
