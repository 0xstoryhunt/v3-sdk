import { Token, CurrencyAmount, WIP9 } from '@storyhunt/sdk-core'
import { FeeAmount, TICK_SPACINGS } from '../constants'
import { nearestUsableTick } from '../utils/nearestUsableTick'
import { TickMath } from '../utils/tickMath'
import { Pool } from './pool'
import { encodeSqrtRatioX96 } from '../utils/encodeSqrtRatioX96'
import JSBI from 'jsbi'
import { NEGATIVE_ONE } from '../internalConstants'

const ONE_IP = JSBI.exponentiate(JSBI.BigInt(10), JSBI.BigInt(18))

describe('Pool', () => {
  const USDC = new Token(1516, '0xF1815bd50389c46847f0Bda824eC8da914045D14', 6, 'USDC', 'USDC')
  const DAI = new Token(1516, '0x6B175474E89094C44Da98b954EedeAC495271d0F', 18, 'DAI', 'DAI Stablecoin')

  describe('constructor', () => {
    it('cannot be used for tokens on different chains', () => {
      expect(() => {
        new Pool(USDC, WIP9[1515], FeeAmount.MEDIUM, encodeSqrtRatioX96(1, 1), 0, 0, [])
      }).toThrow('CHAIN_IDS')
    })

    it('fee must be integer', () => {
      expect(() => {
        new Pool(USDC, WIP9[1516], FeeAmount.MEDIUM + 0.5, encodeSqrtRatioX96(1, 1), 0, 0, [])
      }).toThrow('FEE')
    })

    it('fee cannot be more than 1e6', () => {
      expect(() => {
        // @ts-ignore
        new Pool(USDC, WIP9[1516], 1e6, encodeSqrtRatioX96(1, 1), 0, 0, [])
      }).toThrow('FEE')
    })

    it('cannot be given two of the same token', () => {
      expect(() => {
        new Pool(USDC, USDC, FeeAmount.MEDIUM, encodeSqrtRatioX96(1, 1), 0, 0, [])
      }).toThrow('ADDRESSES')
    })

    it('price must be within tick price bounds', () => {
      expect(() => {
        new Pool(USDC, WIP9[1516], FeeAmount.MEDIUM, encodeSqrtRatioX96(1, 1), 0, 1, [])
      }).toThrow('PRICE_BOUNDS')
      expect(() => {
        new Pool(USDC, WIP9[1516], FeeAmount.MEDIUM, JSBI.add(encodeSqrtRatioX96(1, 1), JSBI.BigInt(1)), 0, -1, [])
      }).toThrow('PRICE_BOUNDS')
    })

    it('works with valid arguments for empty pool medium fee', () => {
      new Pool(USDC, WIP9[1516], FeeAmount.MEDIUM, encodeSqrtRatioX96(1, 1), 0, 0, [])
    })

    it('works with valid arguments for empty pool low fee', () => {
      new Pool(USDC, WIP9[1516], FeeAmount.LOW, encodeSqrtRatioX96(1, 1), 0, 0, [])
    })

    it('works with valid arguments for empty pool lowest fee', () => {
      new Pool(USDC, WIP9[1516], FeeAmount.LOWEST, encodeSqrtRatioX96(1, 1), 0, 0, [])
    })

    it('works with valid arguments for empty pool high fee', () => {
      new Pool(USDC, WIP9[1516], FeeAmount.HIGH, encodeSqrtRatioX96(1, 1), 0, 0, [])
    })
  })

  describe('#getAddress', () => {
    it('matches an example', () => {
      const result = Pool.getAddress(USDC, DAI, FeeAmount.LOW)
      expect(result).toEqual('0x63648AAcd4250cA16c2c3df5dEa409120821D5EC')
    })
  })

  describe('#token0', () => {
    it('always is the token that sorts before', () => {
      let pool = new Pool(USDC, DAI, FeeAmount.LOW, encodeSqrtRatioX96(1, 1), 0, 0, [])
      expect(pool.token0).toEqual(DAI)
      pool = new Pool(DAI, USDC, FeeAmount.LOW, encodeSqrtRatioX96(1, 1), 0, 0, [])
      expect(pool.token0).toEqual(DAI)
    })
  })
  describe('#token1', () => {
    it('always is the token that sorts after', () => {
      let pool = new Pool(USDC, DAI, FeeAmount.LOW, encodeSqrtRatioX96(1, 1), 0, 0, [])
      expect(pool.token1).toEqual(USDC)
      pool = new Pool(DAI, USDC, FeeAmount.LOW, encodeSqrtRatioX96(1, 1), 0, 0, [])
      expect(pool.token1).toEqual(USDC)
    })
  })

  describe('#token0Price', () => {
    it('returns price of token0 in terms of token1', () => {
      expect(
        new Pool(
          USDC,
          DAI,
          FeeAmount.LOW,
          encodeSqrtRatioX96(101e6, 100e18),
          0,
          TickMath.getTickAtSqrtRatio(encodeSqrtRatioX96(101e6, 100e18)),
          []
        ).token0Price.toSignificant(5)
      ).toEqual('1.01')
      expect(
        new Pool(
          DAI,
          USDC,
          FeeAmount.LOW,
          encodeSqrtRatioX96(101e6, 100e18),
          0,
          TickMath.getTickAtSqrtRatio(encodeSqrtRatioX96(101e6, 100e18)),
          []
        ).token0Price.toSignificant(5)
      ).toEqual('1.01')
    })
  })

  describe('#token1Price', () => {
    it('returns price of token1 in terms of token0', () => {
      expect(
        new Pool(
          USDC,
          DAI,
          FeeAmount.LOW,
          encodeSqrtRatioX96(101e6, 100e18),
          0,
          TickMath.getTickAtSqrtRatio(encodeSqrtRatioX96(101e6, 100e18)),
          []
        ).token1Price.toSignificant(5)
      ).toEqual('0.9901')
      expect(
        new Pool(
          DAI,
          USDC,
          FeeAmount.LOW,
          encodeSqrtRatioX96(101e6, 100e18),
          0,
          TickMath.getTickAtSqrtRatio(encodeSqrtRatioX96(101e6, 100e18)),
          []
        ).token1Price.toSignificant(5)
      ).toEqual('0.9901')
    })
  })

  describe('#priceOf', () => {
    const pool = new Pool(USDC, DAI, FeeAmount.LOW, encodeSqrtRatioX96(1, 1), 0, 0, [])
    it('returns price of token in terms of other token', () => {
      expect(pool.priceOf(DAI)).toEqual(pool.token0Price)
      expect(pool.priceOf(USDC)).toEqual(pool.token1Price)
    })

    it('throws if invalid token', () => {
      expect(() => pool.priceOf(WIP9[1516])).toThrow('TOKEN')
    })
  })

  describe('#chainId', () => {
    it('returns the token0 chainId', () => {
      let pool = new Pool(USDC, DAI, FeeAmount.LOW, encodeSqrtRatioX96(1, 1), 0, 0, [])
      expect(pool.chainId).toEqual(1516)
      pool = new Pool(DAI, USDC, FeeAmount.LOW, encodeSqrtRatioX96(1, 1), 0, 0, [])
      expect(pool.chainId).toEqual(1516)
    })
  })

  describe('#involvesToken', () => {
    const pool = new Pool(USDC, DAI, FeeAmount.LOW, encodeSqrtRatioX96(1, 1), 0, 0, [])
    expect(pool.involvesToken(USDC)).toEqual(true)
    expect(pool.involvesToken(DAI)).toEqual(true)
    expect(pool.involvesToken(WIP9[1516])).toEqual(false)
  })

  describe('swaps', () => {
    let pool: Pool

    beforeEach(() => {
      pool = new Pool(USDC, DAI, FeeAmount.LOW, encodeSqrtRatioX96(1, 1), ONE_IP, 0, [
        {
          index: nearestUsableTick(TickMath.MIN_TICK, TICK_SPACINGS[FeeAmount.LOW]),
          liquidityNet: ONE_IP,
          liquidityGross: ONE_IP
        },
        {
          index: nearestUsableTick(TickMath.MAX_TICK, TICK_SPACINGS[FeeAmount.LOW]),
          liquidityNet: JSBI.multiply(ONE_IP, NEGATIVE_ONE),
          liquidityGross: ONE_IP
        }
      ])
    })

    describe('#getOutputAmount', () => {
      it('USDC -> DAI', async () => {
        const inputAmount = CurrencyAmount.fromRawAmount(USDC, 100)
        const [outputAmount] = await pool.getOutputAmount(inputAmount)
        expect(outputAmount.currency.equals(DAI)).toBe(true)
        expect(outputAmount.quotient).toEqual(JSBI.BigInt(98))
      })

      it('DAI -> USDC', async () => {
        const inputAmount = CurrencyAmount.fromRawAmount(DAI, 100)
        const [outputAmount] = await pool.getOutputAmount(inputAmount)
        expect(outputAmount.currency.equals(USDC)).toBe(true)
        expect(outputAmount.quotient).toEqual(JSBI.BigInt(98))
      })
    })

    describe('#getInputAmount', () => {
      it('USDC -> DAI', async () => {
        const outputAmount = CurrencyAmount.fromRawAmount(DAI, 98)
        const [inputAmount] = await pool.getInputAmount(outputAmount)
        expect(inputAmount.currency.equals(USDC)).toBe(true)
        expect(inputAmount.quotient).toEqual(JSBI.BigInt(100))
      })

      it('DAI -> USDC', async () => {
        const outputAmount = CurrencyAmount.fromRawAmount(USDC, 98)
        const [inputAmount] = await pool.getInputAmount(outputAmount)
        expect(inputAmount.currency.equals(DAI)).toBe(true)
        expect(inputAmount.quotient).toEqual(JSBI.BigInt(100))
      })
    })
  })

  describe('#bigNums', () => {
    let pool: Pool
    const bigNum1 = JSBI.add(JSBI.BigInt(Number.MAX_SAFE_INTEGER), JSBI.BigInt(1))
    const bigNum2 = JSBI.add(JSBI.BigInt(Number.MAX_SAFE_INTEGER), JSBI.BigInt(1))
    beforeEach(() => {
      pool = new Pool(USDC, DAI, FeeAmount.LOW, encodeSqrtRatioX96(bigNum1, bigNum2), ONE_IP, 0, [
        {
          index: nearestUsableTick(TickMath.MIN_TICK, TICK_SPACINGS[FeeAmount.LOW]),
          liquidityNet: ONE_IP,
          liquidityGross: ONE_IP
        },
        {
          index: nearestUsableTick(TickMath.MAX_TICK, TICK_SPACINGS[FeeAmount.LOW]),
          liquidityNet: JSBI.multiply(ONE_IP, NEGATIVE_ONE),
          liquidityGross: ONE_IP
        }
      ])
    })

    describe('#priceLimit', () => {
      it('correctly compares two BigIntegers', async () => {
        expect(bigNum1).toEqual(bigNum2)
      })
      it('correctly handles two BigIntegers', async () => {
        const inputAmount = CurrencyAmount.fromRawAmount(USDC, 100)
        const [outputAmount] = await pool.getOutputAmount(inputAmount)
        pool.getInputAmount(outputAmount)
        expect(outputAmount.currency.equals(DAI)).toBe(true)
        // if output is correct, function has succeeded
      })
    })
  })
})
