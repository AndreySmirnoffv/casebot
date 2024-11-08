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
exports.getCase = getCase;
exports.insertCaseCounter = insertCaseCounter;
exports.randomDrop = randomDrop;
exports.getCasesAmountDb = getCasesAmountDb;
const connection_1 = require("../../assets/db/connection");
const logger_1 = __importDefault(require("../../assets/logger/logger"));
const crypto_controller_1 = require("../controllers/crypto.controller"); // Импортируем RowDataPacket
function getCase(tableName) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = `SELECT * FROM ??;`;
        return new Promise((resolve, reject) => {
            connection_1.pool.query(query, [tableName], (error, results) => {
                if (error) {
                    logger_1.default.error("error: " + error);
                    return reject(error);
                }
                resolve(results);
            });
        });
    });
}
function insertCaseCounter() {
    return __awaiter(this, void 0, void 0, function* () {
        const query = "UPDATE cases SET casesAmount = casesAmount + 1;";
        return new Promise((resolve, reject) => {
            connection_1.pool.query(query, (error, results) => {
                if (error) {
                    return reject(error);
                }
                resolve(results);
            });
        });
    });
}
function randomDrop(tableName) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("randomDrop - Запрос уникальных имён из таблицы:", tableName);
        const uniqueNamesQuery = `SELECT DISTINCT name FROM ??`;
        const uniqueNames = yield new Promise((resolve, reject) => {
            connection_1.pool.query(uniqueNamesQuery, [tableName], (error, results) => {
                if (error) {
                    console.error("randomDrop - Ошибка при получении уникальных имён:", error);
                    return reject(new Error("Ошибка при получении уникальных имен: " + error.message));
                }
                console.log("randomDrop - Уникальные имена, полученные из базы данных:", results);
                const names = results.map(result => {
                    const symbol = result.name;
                    console.log("randomDrop - Добавление символа:", symbol);
                    return symbol;
                });
                resolve(names);
            });
        });
        console.log("randomDrop - Полученные уникальные имена после обработки:", uniqueNames);
        for (const symbol of uniqueNames) {
            console.log(symbol);
            yield (0, crypto_controller_1.getCoinData)(symbol);
        }
        const query = `
    SELECT * FROM ?? 
    WHERE name IN (?)
    `;
        return new Promise((resolve, reject) => {
            connection_1.pool.query(query, [tableName, uniqueNames], (error, results) => {
                if (error) {
                    console.error("randomDrop - Ошибка при выборке данных:", error);
                    return reject(new Error("Ошибка при выборке данных: " + error.message));
                }
                const rows = results;
                console.log("randomDrop - Данные, полученные из выборки:", rows);
                resolve(rows);
            });
        });
    });
}
function getCasesAmountDb() {
    return __awaiter(this, void 0, void 0, function* () {
        const query = "SELECT casesAmount FROM cases";
        return new Promise((resolve, reject) => {
            connection_1.pool.query(query, (error, results) => {
                if (error) {
                    return reject(error);
                }
                const rows = results;
                resolve(rows[0]);
            });
        });
    });
}
