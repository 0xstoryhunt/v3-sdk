export declare const FACTORY_ADDRESS = "0x354631ac8fdb2d5d66Ca5809b78BCE9dda1b7973";
export declare const DEPLOYER_ADDRESS = "0x0318592f530Ac3C13CD26c197C68b4475e94852d";
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
