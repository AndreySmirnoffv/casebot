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
exports.handlePrice = handlePrice;
const connection_1 = require("../../assets/db/connection");
function handlePrice(price, tableName, network, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const results = yield new Promise((resolve, reject) => {
                connection_1.pool.query(`SELECT * FROM ?? WHERE network = ?`, [tableName, network], (error, results) => {
                    if (error) {
                        return reject(error);
                    }
                    resolve(results);
                });
            });
            const amounts = results.map(result => result.amount * price);
            res.status(200).send({ amounts });
        }
        catch (error) {
            res.status(500).send({ message: "Ошибка с подключением к БД либо с передачей параметров: " + error });
        }
    });
}
