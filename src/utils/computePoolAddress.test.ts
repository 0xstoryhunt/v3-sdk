import { Token } from '@storyhunt/sdk-core'
import { FeeAmount } from '../constants'
import { computePoolAddress } from './computePoolAddress'

describe('#computePoolAddress', () => {
  const factoryAddress = '0x354631ac8fdb2d5d66Ca5809b78BCE9dda1b7973'
  it('should correctly compute the pool address', () => {
    const tokenA = new Token(1516, '0x1516000000000000000000000000000000000000', 18, 'WIP', 'Wrapped IP')
    const tokenB = new Token(1516, '0xF1815bd50389c46847f0Bda824eC8da914045D14', 18, 'USDC', 'USDC')
    const result = computePoolAddress({
      factoryAddress,
      fee: FeeAmount.LOW,
      tokenA,
      tokenB
    })

    expect(result).toEqual('0x17FE5bA94ce689096b4119d9e92c6d6783c5e152')
  })

  it('should correctly compute the pool address', () => {
    const USDC = new Token(1516, '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', 18, 'USDC', 'USD Coin')
    const DAI = new Token(1516, '0x6B175474E89094C44Da98b954EedeAC495271d0F', 18, 'DAI', 'DAI Stablecoin')
    let tokenA = USDC
    let tokenB = DAI
    const resultA = computePoolAddress({
      factoryAddress,
      fee: FeeAmount.LOW,
      tokenA,
      tokenB
    })

    tokenA = DAI

    tokenB = USDC
    const resultB = computePoolAddress({
      factoryAddress,
      fee: FeeAmount.LOW,
      tokenA,
      tokenB
    })

    expect(resultA).toEqual(resultB)
  })
})
