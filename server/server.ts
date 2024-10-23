import express, { Express, Response } from "express";
import dotenv from "dotenv";
import refRoutes from './src/routes/ref.routes'
import paymentRoutes from './src/routes/payment.routes'
import cryptoRoutes from './src/routes/crypto.routes'
import cors from 'cors';
import logger from "../assets/logger/logger";

dotenv.config({ path: "./assets/modules/.env" });

const app: Express = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.get("/", (_, res: Response) => {
    res.send("Express + TypeScript Server");
});

app.use('/api/payments', paymentRoutes);
app.use('/api/ref', refRoutes);
app.use("/api/crypto", cryptoRoutes)

app.listen(port, () => {
    logger.info(`[server]: Server is running at http://localhost:${port}`);
});
