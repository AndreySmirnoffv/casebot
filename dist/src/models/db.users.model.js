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
exports.getAllUsers = getAllUsers;
exports.updateUserBalance = updateUserBalance;
exports.getCurrentUserBalance = getCurrentUserBalance;
exports.getCurrentUserRubBalance = getCurrentUserRubBalance;
const connection_1 = require("../../assets/db/connection");
const logger_1 = __importDefault(require("../../assets/logger/logger"));
function getAllUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        const query = "SELECT COUNT(*) AS users FROM users;";
        return new Promise((resolve, reject) => {
            connection_1.pool.query(query, (error, results) => {
                if (error) {
                    logger_1.default.error(error);
                    return reject(error);
                }
                const row = results;
                resolve({ users: row[0].users });
            });
        });
    });
}
function updateUserBalance(id, amount) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = "UPDATE users SET balance = ? WHERE id = ?";
        return new Promise((resolve, reject) => {
            connection_1.pool.query(query, [amount, id], (error, results) => {
                if (error) {
                    logger_1.default.error(error);
                    return reject(error);
                }
                resolve(results);
            });
        });
    });
}
function getCurrentUserBalance(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = "SELECT balance FROM users WHERE id = ?";
        return new Promise((resolve, reject) => {
            connection_1.pool.query(query, [id], (error, results) => {
                var _a;
                if (error) {
                    logger_1.default.error(error);
                    return reject(error);
                }
                const row = results;
                resolve(((_a = row[0]) === null || _a === void 0 ? void 0 : _a.balance) || 0);
            });
        });
    });
}
function getCurrentUserRubBalance(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = "SELECT balanceRub FROM users WHERE id = ?";
        return new Promise((resolve, reject) => {
            connection_1.pool.query(query, [id], (error, results) => {
                var _a;
                if (error) {
                    logger_1.default.error(error);
                    return reject(error);
                }
                const row = results;
                resolve(((_a = row[0]) === null || _a === void 0 ? void 0 : _a.balance) || 0);
            });
        });
    });
}
