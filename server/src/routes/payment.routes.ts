import { Router } from 'express';
import { createStripeCheckoutSession, createStripePayoutSession } from '../controllers/stripe.payment.controller';
import { createRubPayment } from '../controllers/payment.controller';

const router = Router();

router.post('/createrubpayment', createRubPayment);
router.post("/createstripepayment", createStripeCheckoutSession)
router.post("/createstripepayout", createStripePayoutSession)

export default router;
