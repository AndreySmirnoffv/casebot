import { YooCheckout } from "@a2seven/yoo-checkout";

export const checkout = new YooCheckout({
    shopId: String(process.env.TEST_YOOMONEY_SHOP_ID),
    secretKey: String(process.env.TEST_YOOMONEY_SECRET_KEY)
});

