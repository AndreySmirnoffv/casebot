import { v4 } from 'uuid';
import { IYooMoneyPayload } from '../interfaces/paymentInterfaces/Yoomoney/IYooMoneyPayload';
import { checkout } from '../services/yoomoney.service';

export async function createRubPayment(amount: number): Promise<any> {
    const payload: IYooMoneyPayload = {
        amount: {
            value: String(amount),
            currency: "RUB"
        },
        payment_method_data: {
            type: 'bank_card'
        },
        confirmation: {
            type: 'redirect',
            return_url: "telegram"
        },
        description: "desc"
    };

    return await checkout.createPayment(payload, v4());
}

export async function captureRubPayment (paymentId: string, amount: number): Promise<any> {
    const payload: IYooMoneyPayload = {
        amount: {
            value: String(amount),
            currency: "RUB"
        },
        payment_method_data: {
            type: 'bank_card'
        },
        confirmation: {
            type: 'redirect',
            return_url: "telegram"
        },
        description: "desc"
    };

    return await checkout.capturePayment(paymentId, payload, v4());
}
