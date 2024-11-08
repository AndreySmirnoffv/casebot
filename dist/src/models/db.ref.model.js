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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRefByChatId = getRefByChatId;
const connection_1 = require("../../assets/db/connection");
function getRefByChatId(chatId, res) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            // const query = `
            //     SELECT ref, COUNT(origin) AS originCount
            //     FROM users 
            //     WHERE chatId = ? AND origin = ? 
            //     GROUP BY ref;
            // `;
            const query = `SELECT ref FROM users WHERE chatId = ?`;
            connection_1.pool.query(query, [chatId, chatId], (error, results) => {
                if (error) {
                    return reject(error);
                }
                const rows = results;
                resolve({ ref: rows[0].ref, originCount: rows[0].originCount });
            });
        });
    });
}
