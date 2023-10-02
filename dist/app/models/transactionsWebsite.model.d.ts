export default class TransactionWebsite {
    user_id: string;
    protected ordertype: any;
    private price;
    protected amount: number;
    private notes;
    private timestamp;
    constructor(transactionWebsite: any);
    static create(newtransaction: any, result: any): void;
    static getAll(result: any): void;
    static findAllTransactionsUser(userId: number, result: any): void;
}
