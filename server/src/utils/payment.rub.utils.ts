import { Payment } from "@a2seven/yoo-checkout";
import { IYooMoneyPayload } from "../interfaces/paymentInterfaces/Yoomoney/IYooMoneyPayload";
import { checkout } from "../services/yoomoney.service";


export async function createPayment(payload: IYooMoneyPayload, id: string) {
    return null
};

export async function capturePayment (paymentId: string, payload: IYooMoneyPayload, id: string) {
    return null

};
