import { openCase, getCases } from "../controllers/cases.controller";
import app from "./payment.routes";

app.post("/getcase", getCases)
app.post("/opencase", openCase)

export default app