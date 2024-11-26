import { getCoinData, withdraw } from "../controllers/crypto.controller";
import app from "./payment.routes";

app.post("/withdeaw", withdraw)

export default app;
