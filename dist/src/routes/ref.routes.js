"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ref_controller_1 = require("../controllers/ref.controller");
const router_1 = require("./router");
router_1.router.post('/getref', ref_controller_1.getRef);
exports.default = router_1.router;
