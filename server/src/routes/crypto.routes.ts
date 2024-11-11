import { getCoinData, withdraw } from "../controllers/crypto.controller";
import { router } from "./router";

router.post("/getcrypto", getCoinData);
router.post("/withdeaw", withdraw)

export default router;
