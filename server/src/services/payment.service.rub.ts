import { v4 } from 'uuid';
import { IYooMoneyPayload } from '../interfaces/paymentInterfaces/Yoomoney/IYooMoneyPayload';
import { capturePayment, createPayment } from '../utils/payment.rub.utils';

export const PaymentServiceRub = {
    createRubPayment: async (amount: number): Promise<any> => {
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

        return await createPayment(payload, v4());
    },

    captureRubPayment: async (paymentId: string, amount: number): Promise<any> => {
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

        return await capturePayment(paymentId, payload, v4());
    }
};
