import { Request, Response } from "express";
import { PaymentServiceRub } from "../services/payment.service.rub";

export async function createRubPayment(req: Request, res: Response) {
    const { amount } = req.body;

    try {
        const paymentResponse = await PaymentServiceRub.createRubPayment(Number(amount));
        res.status(200).send(paymentResponse);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error creating payment');
    }
};

export async function captureRubPayment(req: Request, res: Response) {
    const { paymentId, amount } = req.body;

    try {
        const captureResponse = await PaymentServiceRub.captureRubPayment(paymentId, Number(amount));
        res.status(200).send(captureResponse);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error capturing payment');
    }
}
