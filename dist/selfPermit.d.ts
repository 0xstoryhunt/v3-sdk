import { BigintIsh, Token } from '@storyhunt/sdk-core';
import { Interface } from '@ethersproject/abi';
export interface StandardPermitArguments {
    v: 0 | 1 | 27 | 28;
    r: string;
    s: string;
    amount: BigintIsh;
    deadline: BigintIsh;
}
export interface AllowedPermitArguments {
    v: 0 | 1 | 27 | 28;
    r: string;
    s: string;
    nonce: BigintIsh;
    expiry: BigintIsh;
}
export declare type PermitOptions = StandardPermitArguments | AllowedPermitArguments;
export declare abstract class SelfPermit {
    static INTERFACE: Interface;
    /**
     * Cannot be constructed.
     */
    private constructor();
    static encodePermit(token: Token, options: PermitOptions): string;
}
