import { IP, Token, WIP9 } from '@storyhunt/sdk-core'
import { FeeAmount } from '../constants'
import { encodeSqrtRatioX96 } from '../utils/encodeSqrtRatioX96'
import { TickMath } from '../utils/tickMath'
import { Pool } from './pool'
import { Route } from './route'

describe('Route', () => {
  const _IP = IP.onChain(1516)
  const token0 = new Token(1516, '0x0000000000000000000000000000000000000001', 18, 't0')
  const token1 = new Token(1516, '0x0000000000000000000000000000000000000002', 18, 't1')
  const token2 = new Token(1516, '0x0000000000000000000000000000000000000003', 18, 't2')
  const wip = WIP9[1516]

  const pool_0_1 = new Pool(token0, token1, FeeAmount.MEDIUM, encodeSqrtRatioX96(1, 1), 0, 0, [])
  const pool_0_wip = new Pool(token0, wip, FeeAmount.MEDIUM, encodeSqrtRatioX96(1, 1), 0, 0, [])
  const pool_1_wip = new Pool(token1, wip, FeeAmount.MEDIUM, encodeSqrtRatioX96(1, 1), 0, 0, [])

  describe('path', () => {
    it('constructs a path from the tokens', () => {
      const route = new Route([pool_0_1], token0, token1)
      expect(route.pools).toEqual([pool_0_1])
      expect(route.tokenPath).toEqual([token0, token1])
      expect(route.input).toEqual(token0)
      expect(route.output).toEqual(token1)
      expect(route.chainId).toEqual(1516)
    })
    it('should fail if the input is not in the first pool', () => {
      expect(() => new Route([pool_0_1], wip, token1)).toThrow()
    })
    it('should fail if output is not in the last pool', () => {
      expect(() => new Route([pool_0_1], token0, wip)).toThrow()
    })
  })

  it('can have a token as both input and output', () => {
    const route = new Route([pool_0_wip, pool_0_1, pool_1_wip], wip, wip)
    expect(route.pools).toEqual([pool_0_wip, pool_0_1, pool_1_wip])
    expect(route.input).toEqual(wip)
    expect(route.output).toEqual(wip)
  })

  it('supports IP input', () => {
    const route = new Route([pool_0_wip], _IP, token0)
    expect(route.pools).toEqual([pool_0_wip])
    expect(route.input).toEqual(_IP)
    expect(route.output).toEqual(token0)
  })

  it('supports IP output', () => {
    const route = new Route([pool_0_wip], token0, _IP)
    expect(route.pools).toEqual([pool_0_wip])
    expect(route.input).toEqual(token0)
    expect(route.output).toEqual(_IP)
  })

  describe('#midPrice', () => {
    const pool_0_1 = new Pool(
      token0,
      token1,
      FeeAmount.MEDIUM,
      encodeSqrtRatioX96(1, 5),
      0,
      TickMath.getTickAtSqrtRatio(encodeSqrtRatioX96(1, 5)),
      []
    )
    const pool_1_2 = new Pool(
      token1,
      token2,
      FeeAmount.MEDIUM,
      encodeSqrtRatioX96(15, 30),
      0,
      TickMath.getTickAtSqrtRatio(encodeSqrtRatioX96(15, 30)),
      []
    )
    const pool_0_wip = new Pool(
      token0,
      wip,
      FeeAmount.MEDIUM,
      encodeSqrtRatioX96(3, 1),
      0,
      TickMath.getTickAtSqrtRatio(encodeSqrtRatioX96(3, 1)),
      []
    )
    const pool_1_wip = new Pool(
      token1,
      wip,
      FeeAmount.MEDIUM,
      encodeSqrtRatioX96(1, 7),
      0,
      TickMath.getTickAtSqrtRatio(encodeSqrtRatioX96(1, 7)),
      []
    )

    it('correct for 0 -> 1', () => {
      const price = new Route([pool_0_1], token0, token1).midPrice
      expect(price.toFixed(4)).toEqual('0.2000')
      expect(price.baseCurrency.equals(token0)).toEqual(true)
      expect(price.quoteCurrency.equals(token1)).toEqual(true)
    })

    it('is cached', () => {
      const route = new Route([pool_0_1], token0, token1)
      expect(route.midPrice).toStrictEqual(route.midPrice)
    })

    it('correct for 1 -> 0', () => {
      const price = new Route([pool_0_1], token1, token0).midPrice
      expect(price.toFixed(4)).toEqual('5.0000')
      expect(price.baseCurrency.equals(token1)).toEqual(true)
      expect(price.quoteCurrency.equals(token0)).toEqual(true)
    })

    it('correct for 0 -> 1 -> 2', () => {
      const price = new Route([pool_0_1, pool_1_2], token0, token2).midPrice
      expect(price.toFixed(4)).toEqual('0.1000')
      expect(price.baseCurrency.equals(token0)).toEqual(true)
      expect(price.quoteCurrency.equals(token2)).toEqual(true)
    })

    it('correct for 2 -> 1 -> 0', () => {
      const price = new Route([pool_1_2, pool_0_1], token2, token0).midPrice
      expect(price.toFixed(4)).toEqual('10.0000')
      expect(price.baseCurrency.equals(token2)).toEqual(true)
      expect(price.quoteCurrency.equals(token0)).toEqual(true)
    })

    it('correct for IP -> 0', () => {
      const price = new Route([pool_0_wip], _IP, token0).midPrice
      expect(price.toFixed(4)).toEqual('0.3333')
      expect(price.baseCurrency.equals(_IP)).toEqual(true)
      expect(price.quoteCurrency.equals(token0)).toEqual(true)
    })

    it('correct for 1 -> wip', () => {
      const price = new Route([pool_1_wip], token1, wip).midPrice
      expect(price.toFixed(4)).toEqual('0.1429')
      expect(price.baseCurrency.equals(token1)).toEqual(true)
      expect(price.quoteCurrency.equals(wip)).toEqual(true)
    })

    it('correct for IP -> 0 -> 1 -> wip', () => {
      const price = new Route([pool_0_wip, pool_0_1, pool_1_wip], _IP, wip).midPrice
      expect(price.toSignificant(4)).toEqual('0.009524')
      expect(price.baseCurrency.equals(_IP)).toEqual(true)
      expect(price.quoteCurrency.equals(wip)).toEqual(true)
    })

    it('correct for wip -> 0 -> 1 -> IP', () => {
      const price = new Route([pool_0_wip, pool_0_1, pool_1_wip], wip, _IP).midPrice
      expect(price.toSignificant(4)).toEqual('0.009524')
      expect(price.baseCurrency.equals(wip)).toEqual(true)
      expect(price.quoteCurrency.equals(_IP)).toEqual(true)
    })
  })
})
