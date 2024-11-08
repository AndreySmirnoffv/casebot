"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createStripeCheckoutSession = createStripeCheckoutSession;
exports.updateStripeCheckoutSession = updateStripeCheckoutSession;
exports.updateStripePaymentStatus = updateStripePaymentStatus;
exports.createStripePayoutSession = createStripePayoutSession;
exports.getStripePayouts = getStripePayouts;
const stripe_service_1 = require("../services/stripe.service");
const db_stripe_model_1 = require("../models/db.stripe.model");
const logger_1 = __importDefault(require("../../assets/logger/logger"));
const db_users_model_1 = require("../models/db.users.model");
function createStripeCheckoutSession(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { amount, currency, userId, email } = req.body;
        try {
            const response = yield stripe_service_1.stripe.paymentIntents.create({
                amount: amount / 100,
                currency: currency,
                automatic_payment_methods: {
                    enabled: true
                },
                receipt_email: email
            });
            const userBalance = yield (0, db_users_model_1.getCurrentUserBalance)(userId);
            console.log(response);
            yield (0, db_stripe_model_1.insertStripePayment)(response, userId);
            yield (0, db_users_model_1.updateUserBalance)(userBalance + response.amount, userId);
            res.json(response);
        }
        catch (error) {
            console.error(error);
            return res.status(500).send(error);
        }
    });
}
function updateStripeCheckoutSession(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { paymentId, email } = req.body;
        const response = yield stripe_service_1.stripe.paymentIntents.update(paymentId, {
            receipt_email: email
        });
        res.json(response);
        console.info(response);
    });
}
function updateStripePaymentStatus(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { paymentId, status } = req.body;
        yield (0, db_stripe_model_1.updateStripePaymentsStatus)(paymentId, status);
    });
}
function createStripePayoutSession(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { amount, currency, destination, userId } = req.body;
        try {
            const response = yield stripe_service_1.stripe.payouts.create({
                amount: amount,
                currency: currency,
                destination: destination
            });
            const userBalance = yield (0, db_users_model_1.getCurrentUserBalance)(userId);
            yield (0, db_users_model_1.updateUserBalance)(userBalance - response.amount, userId);
            logger_1.default.info(response);
            res.json(response);
        }
        catch (error) {
            console.error(error);
        }
    });
}
function getStripePayouts(res) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield (0, db_stripe_model_1.listStripePayouts)();
        logger_1.default.info(response);
        return res.json(response);
    });
}
