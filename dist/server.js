"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const ref_routes_1 = __importDefault(require("./src/routes/ref.routes"));
const payment_routes_1 = __importDefault(require("./src/routes/payment.routes"));
// import casesRoutes  from './src/routes/cases.routes'
const users_routes_1 = __importDefault(require("./src/routes/users.routes"));
// import cryptoRoutes from './src/routes/crypto.routes'
const cors_1 = __importDefault(require("cors"));
const logger_1 = __importDefault(require("./assets/logger/logger"));
dotenv_1.default.config({ path: "./assets/modules/.env" });
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: "https://crypto-drop.netlify.app",
    credentials: true
}));
app.get("/", (_, res) => {
    res.send("Express + TypeScript Server");
});
app.use('/api/payments', payment_routes_1.default);
app.use('/api/ref', ref_routes_1.default);
// app.use("/api/cases", casesRoutes)
app.use("/api/gettotalusers", users_routes_1.default);
// app.use("/api/crypto", cryptoRoutes)
app.listen(port, () => {
    logger_1.default.info(`[server]: Server is running at http://localhost:${port}`);
});
