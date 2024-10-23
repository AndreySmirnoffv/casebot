import { Router } from 'express';
import { createRubPayment } from '../controllers/payment.controller';
import { createStripeCheckoutSession } from '../controllers/stripe.payment.controller';

const router = Router();

router.post('/createrubpayment', createRubPayment);
router.post("/createstripepayment", createStripeCheckoutSession)

export default router;
