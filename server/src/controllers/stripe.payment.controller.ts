import { Request, Response } from "express";
import logger from "../../../assets/logger/logger";
import { createStripePayment, createStripePayout } from "../services/payment.service";
import { insertStripePayment } from "../models/db.stripe.model";

export async function createStripeCheckoutSession(req: Request, res: Response){
    const {amount, currency, userId} = req.body

    try {
        const response = await createStripePayment(amount, currency)
        logger.log(response)
        res.json(response)
        insertStripePayment(response, userId, res)
    } catch (error) {
        logger.error(error)
    }

}

export async function createStripePayoutSession(req: Request, res: Response){
    const {amount, currency, destination} = req.body

    try {
        const response = await createStripePayout(amount, currency, destination)
        logger.log(response)
        res.json(response)
    } catch (error) {
        logger.error(error)
    }
}