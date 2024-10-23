import {createStripePayment} from '../models/payment.module'

export async function createPaymentStripe(amount: number, currency: string): Promise<any>{
    return await createStripePayment(amount, currency)
}