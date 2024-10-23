import { YooCheckout } from "@a2seven/yoo-checkout";

console.log('Shop ID:', process.env.SHOP_ID);
console.log('Secret Key:', process.env.SECRET_KEY);

const SHOP_ID = "435080"
const SECRET_KEY = "test_rKFyjZqLMjCXQEiBPGnq_qyV6JqqtiXRFSW0AlCpHgI"

export const checkout = new YooCheckout({
    shopId: SHOP_ID,
    secretKey: SECRET_KEY
});
