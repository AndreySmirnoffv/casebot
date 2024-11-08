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
exports.getRef = getRef;
const db_ref_model_1 = require("../models/db.ref.model");
function getRef(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { chatId } = req.body;
        try {
            console.log(typeof chatId);
            const ref = yield (0, db_ref_model_1.getRefByChatId)(chatId, res);
            if (!ref) {
                return res.status(404).json({ message: "User not found" });
            }
            console.log("ref from db: " + ref);
            return res.status(200).json({ ref });
        }
        catch (error) {
            console.error("get ref error: ", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    });
}
;
