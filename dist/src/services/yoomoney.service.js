"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkout = void 0;
const yoo_checkout_1 = require("@a2seven/yoo-checkout");
const SHOP_ID = "486116";
const SECRET_KEY = "test_iU7WuytmxSZNm0hnnkAFFC2SC-5KK_QBeheAvuLCu18";
exports.checkout = new yoo_checkout_1.YooCheckout({
    shopId: SHOP_ID,
    secretKey: SECRET_KEY
});
