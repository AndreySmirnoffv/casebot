"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.allUsers = allUsers;
exports.userBalance = userBalance;
const db_users_model_1 = require("../models/db.users.model");
function allUsers(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield (0, db_users_model_1.getAllUsers)();
        return res.json(response);
    });
}
function userBalance(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.body;
        const response = yield (0, db_users_model_1.getCurrentUserBalance)(id);
        return res.json(response);
    });
}
