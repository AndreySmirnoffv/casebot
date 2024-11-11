import { allUsers } from "../controllers/users.controller";
import { router } from "./router";

router.get("/users", allUsers)

export default router