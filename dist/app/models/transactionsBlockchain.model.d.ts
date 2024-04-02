export default class TransactionBlockchain {
    private user_id;
    private fromAddress;
    private toAddress;
    private notes;
    constructor(transactionBlockchain: any);
    static create(newtransaction: any, result: any): void;
    static getAll(result: any): void;
    static findAllById(user_id: any, result: any): void;
}
