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
exports.insertStripePayment = insertStripePayment;
exports.updateStripePaymentsStatus = updateStripePaymentsStatus;
exports.listStripePayouts = listStripePayouts;
const connection_1 = require("../../assets/db/connection");
const logger_1 = __importDefault(require("../../assets/logger/logger"));
const stripe_service_1 = require("../services/stripe.service");
function insertStripePayment(response, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(response.id, response.amount, response.status, userId);
        return new Promise((resolve, reject) => {
            const query = "INSERT INTO payments (id, amount, status, userId) VALUES (?, ?, ?, ?)";
            connection_1.pool.query(query, [response.id, response.amount, response.status, userId], (error, results) => {
                if (error) {
                    console.error("Error inserting into database", error);
                    return reject(error);
                }
                resolve(results);
            });
        });
    });
}
function updateStripePaymentsStatus(paymentId, status, res) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            const query = "UPDATE payments SET status = ? WHERE id = ?";
            connection_1.pool.query(query, [status, paymentId], (error, results) => {
                if (error) {
                    console.log(error);
                    return res === null || res === void 0 ? void 0 : res.status(500).send(error);
                }
                res === null || res === void 0 ? void 0 : res.json(results);
                resolve(results);
            });
        });
    });
}
function listStripePayouts() {
    return __awaiter(this, void 0, void 0, function* () {
        return logger_1.default.info((yield stripe_service_1.stripe.payouts.list()).data.length);
    });
}
