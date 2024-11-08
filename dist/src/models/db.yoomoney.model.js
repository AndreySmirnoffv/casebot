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
exports.insertYooMoneyPayment = insertYooMoneyPayment;
exports.updateYooMoneyPaymentStatus = updateYooMoneyPaymentStatus;
const connection_1 = require("../../assets/db/connection");
const logger_1 = __importDefault(require("../../assets/logger/logger"));
function insertYooMoneyPayment(response, userId, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = "INSRT INTO payments (id, amount, status, userId) VALUES (?, ?, ?, ?)";
        return new Promise((resolve, reject) => {
            connection_1.pool.query(query, [response.id, response.amount.value, response.status], (results, error) => {
                if (error) {
                    logger_1.default.error("Error inserting yoomomney Payment", error);
                    return reject(error);
                }
                res === null || res === void 0 ? void 0 : res.json(results);
                resolve(results);
            });
        });
    });
}
function updateYooMoneyPaymentStatus(response, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = "UPDATE payments SET status = ? WHERE id = ?";
        return new Promise((resolve, reject) => {
            connection_1.pool.query(query, [response.status, response.id], (error, results) => {
                if (error) {
                    logger_1.default.error("Errro updating yoomoney payment data", error);
                    return reject(error);
                }
                resolve(results);
            });
        });
    });
}
