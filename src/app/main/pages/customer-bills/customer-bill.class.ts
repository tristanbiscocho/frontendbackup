export class BillToStripeModel {
    BillId: number;
    CustomerId: number;
    Amount: number;
    Stoken: string;
    TokenObject: string;
    ChargeObject?: string;
    constructor(init?: Partial<BillToStripeModel>) {
        Object.assign(this, init);
    }
}