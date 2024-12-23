import { Percent, Token } from '@storyhunt/sdk-core'
import JSBI from 'jsbi'
import { Payments } from './payments'

const recipient = '0x0000000000000000000000000000000000000003'
const amount = JSBI.BigInt(123)

const feeOptions = {
  fee: new Percent(1, 1000),
  recipient: '0x0000000000000000000000000000000000000009'
}

const token = new Token(1516, '0x0000000000000000000000000000000000000001', 18, 't0', 'token0')

describe('Payments', () => {
  describe('#encodeUnwrapWIP9', () => {
    it('works without feeOptions', () => {
      const calldata = Payments.encodeUnwrapWIP9(amount, recipient)
      expect(calldata).toBe(
        '0x49404b7c000000000000000000000000000000000000000000000000000000000000007b0000000000000000000000000000000000000000000000000000000000000003'
      )
    })

    it('works with feeOptions', () => {
      const calldata = Payments.encodeUnwrapWIP9(amount, recipient, feeOptions)
      expect(calldata).toBe(
        '0x9b2c0a37000000000000000000000000000000000000000000000000000000000000007b0000000000000000000000000000000000000000000000000000000000000003000000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000000000000000000000000000000000000000009'
      )
    })
  })

  describe('#encodeSweepToken', () => {
    it('works without feeOptions', () => {
      const calldata = Payments.encodeSweepToken(token, amount, recipient)
      expect(calldata).toBe(
        '0xdf2ab5bb0000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000007b0000000000000000000000000000000000000000000000000000000000000003'
      )
    })

    it('works with feeOptions', () => {
      const calldata = Payments.encodeSweepToken(token, amount, recipient, feeOptions)
      expect(calldata).toBe(
        '0xe0e189a00000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000007b0000000000000000000000000000000000000000000000000000000000000003000000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000000000000000000000000000000000000000009'
      )
    })
  })

  it('#encodeRefundIP', () => {
    const calldata = Payments.encodeRefundIP()
    expect(calldata).toBe('0x12210e8a')
  })
})
