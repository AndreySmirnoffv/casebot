"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cryptoClient = void 0;
const bybit_api_1 = require("bybit-api");
exports.cryptoClient = new bybit_api_1.RestClientV5({
    testnet: true,
    key: "UD4qNh0zpO0pCVTeCm",
    secret: "8nYk1lCajlx95b5EyjlroZ9dWXDorBcyp4sC",
});
