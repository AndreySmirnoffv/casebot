"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const users_controller_1 = require("../controllers/users.controller");
const router_1 = require("./router");
router_1.router.get("/users", users_controller_1.allUsers);
exports.default = router_1.router;
