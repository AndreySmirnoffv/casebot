import express, { Express, Response } from "express";
import dotenv from "dotenv";
import refRoutes from './src/routes/ref.routes';
import paymentRoutes from './src/routes/payment.routes';
import casesRoutes  from './src/routes/cases.routes';
import usersRoutes from './src/routes/users.routes';
import cryptoRoutes from './src/routes/crypto.routes';
import cors from 'cors';
import logger from "./assets/logger/logger";

dotenv.config();

console.log('PORT:', process.env.PORT);

const app: Express = express();

const port = process.env.PORT;
app.use(express.json());
app.use(cors({
    origin: "https://crypto-drop.netlify.app",
    credentials: true
}));

app.get("/", (_, res: Response) => {
    res.send("Express + TypeScript Server");
});

app.use('/api/payments', paymentRoutes);
app.use('/api/ref', refRoutes);
app.use("/api/cases", casesRoutes);
app.use("/api/gettotalusers", usersRoutes);
app.use("/api/crypto", cryptoRoutes);

app.listen(port, () => {
    logger.info(`[server]: Server is running at http://localhost:${port}`);
});
