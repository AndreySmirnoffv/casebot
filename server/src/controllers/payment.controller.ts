import { v4 } from 'uuid';
import { checkout } from '../services/yoomoney.service';
import { ICreatePayment, ICreateReceipt } from '@a2seven/yoo-checkout';
import { Request, Response } from 'express';
import { insertYooMoneyPayment, updateYooMoneyPaymentStatus } from '../models/db.yoomoney.model';
import logger from '../../assets/logger/logger';


async function createReceipt(email: string, amount: string): Promise<ICreateReceipt> {
    const usd = Number(amount) / 100;

    const payload: ICreateReceipt = {
        type: "payment",
        customer: {
            email: email
        },
        send: true,
        settlements: [
            {
                type: "cashless",
                amount: {
                    value: String(usd),
                    currency: "RUB"
                }
            }
        ],
        items: [
            {
                description: "Пополнение в кейсах",
                quantity: "1",
                amount: {
                    value: String(usd),
                    currency: "RUB"
                },
                vat_code: 1,
                payment_mode: "full_payment",
                payment_subject: "lottery"
            }
        ],
    };

    return await checkout.createReceipt(payload, v4());
}

export async function createRubPayment(req: Request, res: Response): Promise<any> {
    const { amount, userId, email } = req.body;

    try {

        const payload: ICreatePayment = {
            amount: {
                value: amount,
                currency: "RUB"
            },
            confirmation: {
                type: 'embedded',
                return_url: "https://google.com"
            },
            receipt: await createReceipt(email, String(amount)),
            capture: true,
            description: "desc"
        };
        
        const paymentResponse = await checkout.createPayment(payload, v4());
        console.log(paymentResponse);
        await insertYooMoneyPayment(paymentResponse, userId);
        res.status(200).json(paymentResponse); 
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export async function getPayment(req: Request, res: Response): Promise<any>{
    try {
        const {paymentId, userId} = req.body

        const getPaymentResponse = await checkout.getPayment(paymentId)
        if (getPaymentResponse.id !== "succeded" && !getPaymentResponse.paid){
            updateYooMoneyPaymentStatus(getPaymentResponse.status, userId)
        }else{
            
        }
        console.log(getPaymentResponse)
        res.json(getPaymentResponse)
    } catch (error) {
        logger.error(error)
    }

}
