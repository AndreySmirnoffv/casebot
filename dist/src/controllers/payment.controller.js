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
exports.createRubPayment = createRubPayment;
exports.getPayment = getPayment;
const uuid_1 = require("uuid");
const yoomoney_service_1 = require("../services/yoomoney.service");
const db_yoomoney_model_1 = require("../models/db.yoomoney.model");
const logger_1 = __importDefault(require("../../assets/logger/logger"));
function createReceipt(email, amount) {
    return __awaiter(this, void 0, void 0, function* () {
        const usd = Number(amount) / 100;
        const payload = {
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
        return yield yoomoney_service_1.checkout.createReceipt(payload, (0, uuid_1.v4)());
    });
}
function createRubPayment(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { amount, userId, email } = req.body;
        try {
            const payload = {
                amount: {
                    value: amount,
                    currency: "RUB"
                },
                confirmation: {
                    type: 'embedded',
                    return_url: "https://google.com"
                },
                receipt: yield createReceipt(email, String(amount)),
                capture: true,
                description: "desc"
            };
            const paymentResponse = yield yoomoney_service_1.checkout.createPayment(payload, (0, uuid_1.v4)());
            console.log(paymentResponse);
            yield (0, db_yoomoney_model_1.insertYooMoneyPayment)(paymentResponse, userId);
            res.status(200).json(paymentResponse);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });
}
function getPayment(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { paymentId, userId } = req.body;
            const getPaymentResponse = yield yoomoney_service_1.checkout.getPayment(paymentId);
            if (getPaymentResponse.id !== "succeded" && !getPaymentResponse.paid) {
                (0, db_yoomoney_model_1.updateYooMoneyPaymentStatus)(getPaymentResponse.status, userId);
            }
            else {
            }
            console.log(getPaymentResponse);
            res.json(getPaymentResponse);
        }
        catch (error) {
            logger_1.default.error(error);
        }
    });
}
