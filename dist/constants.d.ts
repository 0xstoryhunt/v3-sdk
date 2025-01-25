export declare const FACTORY_ADDRESS: string;
export declare const DEPLOYER_ADDRESS: string;
export declare const ADDRESS_ZERO = "0x0000000000000000000000000000000000000000";
export declare const POOL_INIT_CODE_HASH = "0x5c1ebb91ef1669cb3e664cbf78650858b19d8a4247ca18abab152d5d4f1604db";
/**
 * The default factory enabled fee amounts, denominated in hundredths of bips.
 */
export declare enum FeeAmount {
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
export declare const TICK_SPACINGS: {
    [amount in FeeAmount]: number;
};
