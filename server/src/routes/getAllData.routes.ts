import { getAllData } from "../controllers/getAllData.controller";
import app from "./payment.routes";

app.get("/getalldata", getAllData)

export default app;