import { Interface } from '@ethersproject/abi'
import CONSTANTS from '@storyhunt/default-list/build/storyhunt-default.constantlist.json'

export abstract class Multicall {
  //the encoding of the multicall function is used from either NFT manager or Swap router(essentially same)
  public static INTERFACE: Interface = new Interface(CONSTANTS.constants.interfaces.NFT_POSITION_MANAGER_CONTRACT.interface.abi)

  /**
   * Cannot be constructed.
   */
  private constructor() {}

  public static encodeMulticall(calldatas: string | string[]): string {
    if (!Array.isArray(calldatas)) {
      calldatas = [calldatas]
    }

    return calldatas.length === 1 ? calldatas[0] : Multicall.INTERFACE.encodeFunctionData('multicall', [calldatas])
  }

  public static decodeMulticall(multicall: string): string[] {
    return Multicall.INTERFACE.decodeFunctionData('multicall', multicall).data
  }
}
