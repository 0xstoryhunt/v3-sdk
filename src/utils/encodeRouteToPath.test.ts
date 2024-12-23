import { IP, Token, WIP9 } from '@storyhunt/sdk-core'
import { FeeAmount } from '../constants'
import { Pool } from '../entities/pool'
import { Route } from '../entities/route'
import { encodeRouteToPath } from './encodeRouteToPath'
import { encodeSqrtRatioX96 } from './encodeSqrtRatioX96'

describe('#encodeRouteToPath', () => {
  const _IP = IP.onChain(1516)
  const token0 = new Token(1516, '0x0000000000000000000000000000000000000001', 18, 't0', 'token0')
  const token1 = new Token(1516, '0x0000000000000000000000000000000000000002', 18, 't1', 'token1')
  const token2 = new Token(1516, '0x0000000000000000000000000000000000000003', 18, 't2', 'token2')
  // const token3 = new Token(1516, '0x0000000000000000000000000000000000000004', 18, 't3', 'token3')

  const wip = WIP9[1516]

  const pool_0_1_medium = new Pool(token0, token1, FeeAmount.MEDIUM, encodeSqrtRatioX96(1, 1), 0, 0, [])
  const pool_1_2_low = new Pool(token1, token2, FeeAmount.LOW, encodeSqrtRatioX96(1, 1), 0, 0, [])
  const pool_0_wip = new Pool(token0, wip, FeeAmount.MEDIUM, encodeSqrtRatioX96(1, 1), 0, 0, [])
  const pool_1_wip = new Pool(token1, wip, FeeAmount.MEDIUM, encodeSqrtRatioX96(1, 1), 0, 0, [])

  const route_0_1 = new Route([pool_0_1_medium], token0, token1)
  const route_0_1_2 = new Route([pool_0_1_medium, pool_1_2_low], token0, token2)

  const route_0_wip = new Route([pool_0_wip], token0, _IP)
  const route_0_1_wip = new Route([pool_0_1_medium, pool_1_wip], token0, _IP)
  const route_wip_0 = new Route([pool_0_wip], _IP, token0)
  const route_wip_0_1 = new Route([pool_0_wip, pool_0_1_medium], _IP, token1)

  it('packs them for exact input single hop', () => {
    expect(encodeRouteToPath(route_0_1, false)).toEqual(
      '0x0000000000000000000000000000000000000001000bb80000000000000000000000000000000000000002'
    )
  })

  it('packs them correctly for exact output single hop', () => {
    expect(encodeRouteToPath(route_0_1, true)).toEqual(
      '0x0000000000000000000000000000000000000002000bb80000000000000000000000000000000000000001'
    )
  })

  it('packs them correctly for multihop exact input', () => {
    expect(encodeRouteToPath(route_0_1_2, false)).toEqual(
      '0x0000000000000000000000000000000000000001000bb800000000000000000000000000000000000000020001f40000000000000000000000000000000000000003'
    )
  })

  it('packs them correctly for multihop exact output', () => {
    expect(encodeRouteToPath(route_0_1_2, true)).toEqual(
      '0x00000000000000000000000000000000000000030001f40000000000000000000000000000000000000002000bb80000000000000000000000000000000000000001'
    )
  })

  it('wraps IP input for exact input single hop', () => {
    expect(encodeRouteToPath(route_wip_0, false)).toEqual(
      '0x1516000000000000000000000000000000000000000bb80000000000000000000000000000000000000001'
    )
  })
  it('wraps IP input for exact output single hop', () => {
    expect(encodeRouteToPath(route_wip_0, true)).toEqual(
      '0x0000000000000000000000000000000000000001000bb81516000000000000000000000000000000000000'
    )
  })
  it('wraps IP input for exact input multihop', () => {
    expect(encodeRouteToPath(route_wip_0_1, false)).toEqual(
      '0x1516000000000000000000000000000000000000000bb80000000000000000000000000000000000000001000bb80000000000000000000000000000000000000002'
    )
  })
  it('wraps IP input for exact output multihop', () => {
    expect(encodeRouteToPath(route_wip_0_1, true)).toEqual(
      '0x0000000000000000000000000000000000000002000bb80000000000000000000000000000000000000001000bb81516000000000000000000000000000000000000'
    )
  })

  it('wraps IP output for exact input single hop', () => {
    expect(encodeRouteToPath(route_0_wip, false)).toEqual(
      '0x0000000000000000000000000000000000000001000bb81516000000000000000000000000000000000000'
    )
  })
  it('wraps IP output for exact output single hop', () => {
    expect(encodeRouteToPath(route_0_wip, true)).toEqual(
      '0x1516000000000000000000000000000000000000000bb80000000000000000000000000000000000000001'
    )
  })
  it('wraps IP output for exact input multihop', () => {
    expect(encodeRouteToPath(route_0_1_wip, false)).toEqual(
      '0x0000000000000000000000000000000000000001000bb80000000000000000000000000000000000000002000bb81516000000000000000000000000000000000000'
    )
  })
  it('wraps IP output for exact output multihop', () => {
    expect(encodeRouteToPath(route_0_1_wip, true)).toEqual(
      '0x1516000000000000000000000000000000000000000bb80000000000000000000000000000000000000002000bb80000000000000000000000000000000000000001'
    )
  })
})
