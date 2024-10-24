import Stripe from "stripe";

const stripe = new Stripe('');

export async function createStripePayment(amount: number, currency: string){
    return await stripe.paymentIntents.create({
        amount: amount,
        currency: currency,
        automatic_payment_methods: {
            enabled: true
        }
    })
}

export async function createStripePayout(amount: number, currency: string, destination: string): Promise<any>{
    return await stripe.payouts.create({
        amount: amount,
        currency: currency,
        destination: destination
    })
}
