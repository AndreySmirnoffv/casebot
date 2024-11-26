import { allUsers, userBalance } from "../controllers/users.controller";
import app from "./payment.routes";

app.get("/users", allUsers)
app.post("/balance", userBalance)

export default app