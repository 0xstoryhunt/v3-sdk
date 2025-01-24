import { BigintIsh } from '@storyhunt/sdk-core';
import { Position } from './entities';
import { AddLiquidityOptions, CollectOptions, RemoveLiquidityOptions } from './nonfungiblePositionManager';
import { MethodParameters } from './utils';
import { Interface } from '@ethersproject/abi';
interface WidthDrawOptions {
    tokenId: BigintIsh;
    to: string;
}
interface HarvestOptions {
    tokenId: BigintIsh;
    to: string;
}
export declare abstract class AlphaHunterV3 {
    static ABI: {
        _format: string;
        contractName: string;
        sourceName: string;
        abi: ({
            inputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            stateMutability: string;
            type: string;
            name?: undefined;
            anonymous?: undefined;
            outputs?: undefined;
        } | {
            inputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            name: string;
            type: string;
            stateMutability?: undefined;
            anonymous?: undefined;
            outputs?: undefined;
        } | {
            anonymous: boolean;
            inputs: {
                indexed: boolean;
                internalType: string;
                name: string;
                type: string;
            }[];
            name: string;
            type: string;
            stateMutability?: undefined;
            outputs?: undefined;
        } | {
            inputs: ({
                components: {
                    internalType: string;
                    name: string;
                    type: string;
                }[];
                internalType: string;
                name: string;
                type: string;
            } | {
                internalType: string;
                name: string;
                type: string;
                components?: undefined;
            })[];
            name: string;
            outputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            stateMutability: string;
            type: string;
            anonymous?: undefined;
        } | {
            stateMutability: string;
            type: string;
            inputs?: undefined;
            name?: undefined;
            anonymous?: undefined;
            outputs?: undefined;
        })[];
        bytecode: string;
        deployedBytecode: string;
        linkReferences: {};
        deployedLinkReferences: {};
    };
    static INTERFACE: Interface;
    /**
     * Cannot be constructed.
     */
    private constructor();
    static addCallParameters(position: Position, options: AddLiquidityOptions): MethodParameters;
    private static encodeCollect;
    static collectCallParameters(options: CollectOptions): MethodParameters;
    static removeCallParameters(position: Position, options: RemoveLiquidityOptions): MethodParameters;
    static harvestCallParameters(options: HarvestOptions): {
        calldata: string;
        value: string;
    };
    static batchHarvestCallParameters(options: HarvestOptions[]): {
        calldata: string;
        value: string;
    };
    static encodeHarvest(options: HarvestOptions): any[];
    static withdrawCallParameters(options: WidthDrawOptions): {
        calldata: string;
        value: string;
    };
}
export {};
