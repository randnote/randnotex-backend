export interface userType {
    id?: number;
    firstname: string;
    lastname: string;
    email: string;
    verifiedEmail: boolean;
    password: string;
}
export interface depositType {
    user_id: number;
    card_id: number;
    amount: number;
    timestamp: Date | string;
}
export interface addressesType {
    user_id: number | undefined;
    publicAddress: string;
    privateAddress: string;
}
export interface updateBalanceType {
    userId: number;
    type: string;
    amount: number;
}
export default class User {
    private firstname;
    private lastname;
    private password;
    private email;
    private verifiedEmail;
    constructor(user: userType);
    static create(newuser: any, result: any): void;
    static getAll(result: any): void;
    static findAutoGens(result: any): void;
    static findById(userId: any, result: any): void;
    static getKeys(userId: any, result: any): void;
    static getData(result: any): void;
    static addUserAddresses(userAddressObject: addressesType, result: any): void;
    static login(obj: any, result: any): void;
    static deposit: (obj: depositType, result: any) => void;
    static addBalance: (updateObject: updateBalanceType) => Promise<void>;
    static addBalance2: (updateObject: updateBalanceType) => Promise<void>;
    static reduceBalance: (updateObject: updateBalanceType) => void;
    static zarbalance: (userId: number | string, result: any) => void;
}
