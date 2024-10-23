import { Request, Response } from "express";
import { createPaymentStripe } from "../services/payment.service";
import logger from "../../../assets/logger/logger";

export async function createStripeCheckoutSession(req: Request, res: Response){
    const {amount, currency} = req.body

    try {
        const response = await createPaymentStripe(amount, currency)
        logger.log(response)
        res.json(response)
    } catch (error) {
        logger.error(error)
    }

}