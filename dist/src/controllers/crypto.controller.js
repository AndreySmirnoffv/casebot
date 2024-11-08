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
exports.getCoinData = getCoinData;
exports.withdraw = withdraw;
const crypto_service_1 = require("../services/crypto.service");
const logger_1 = __importDefault(require("../../assets/logger/logger"));
function getCoinData(coin, res) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("getCoinData - Запрос данных для монеты:", coin);
        try {
            // const response = await cryptoClient.getTickers({
            //     category: 'linear',
            //     symbol: coin,
            // });
            yield crypto_service_1.cryptoClient
                .getPositionInfo({
                category: "spot",
                symbol: "BTCUSDT"
            })
                .then((response) => {
                console.log(response);
            })
                .catch((error) => {
                console.error(error);
            });
        }
        catch (error) {
            console.error("getCoinData - Ошибка при запросе данных для монеты:", error);
            res === null || res === void 0 ? void 0 : res.status(500).send(error);
        }
    });
}
getCoinData("USDT");
function withdraw(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { coin, chain, address, amount } = req.body;
        crypto_service_1.cryptoClient.submitWithdrawal({
            coin: coin,
            chain: chain,
            address: address,
            amount: amount,
            timestamp: Date.now(),
            forceChain: 0,
            accountType: "SPOT"
        }).then(response => {
            logger_1.default.info(response);
            res.json({ response });
        }).catch(error => {
            logger_1.default.error(error);
            res.status(500).json({ error });
        });
    });
}
