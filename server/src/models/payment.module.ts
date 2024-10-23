import Stripe from "stripe";

const stripe = new Stripe('sk_test_51OkRe7KsvhRur5TZI1OezYZ1cfRffOeewWByGUPRz5sAGvjQBJY07B1iueIplIXK3VzJI27u5VDGMkqS1U7X7jia002CfMo36a');

export async function createStripePayment(amount: number, currency: string){
    return await stripe.paymentIntents.create({
        amount: amount,
        currency: currency,
        automatic_payment_methods: {
            enabled: true
        }
    })
}