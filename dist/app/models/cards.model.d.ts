interface cardType {
    user_id: number;
    cardnumber: number;
    carddetails: string;
    month: number;
    year: number;
    cvc: number;
}
export default class Card {
    private user_id;
    private cardnumber;
    private carddetails;
    private month;
    private year;
    private cvc;
    constructor(card: cardType);
    static create(newcard: any, result: any): void;
    static delete(cardId: any, result: any): void;
    static getAllUser(userId: any, result: any): void;
}
export {};
