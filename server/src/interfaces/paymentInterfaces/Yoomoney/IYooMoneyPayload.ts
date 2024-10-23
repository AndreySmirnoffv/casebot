export interface IYooMoneyPayload {
    amount: {
        value: string;
        currency: "RUB";
    };
    payment_method_data: {
        type: "bank_card";
    };
    confirmation: {
        type: 'redirect';
        return_url: string;
    };
    description: string;
}
