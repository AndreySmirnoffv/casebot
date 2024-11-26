import { app } from '../../server';
import {createRubPayment, getPayment, rubPayout } from '../controllers/payment.controller';
import { createStripeCheckoutSession, createStripePayoutSession, getStripePayouts, updateStripeCheckoutSession, updateStripePaymentStatus } from '../controllers/stripe.payment.controller';

app.post("/createstripepayment", createStripeCheckoutSession)
app.post("/createstripepayout", createStripePayoutSession)
app.post("/updatestripepaymentstatus", updateStripePaymentStatus)
app.get("/getstripepayoutes", getStripePayouts)
app.post("/createrubpayment", createRubPayment)
app.post("/capturerubpayment", getPayment)
app.post("/rubpayouts", rubPayout)
app.post("/updatestripepayment", updateStripeCheckoutSession)

export default app;
