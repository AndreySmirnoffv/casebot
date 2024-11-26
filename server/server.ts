import express, { Express, Response } from "express";
import dotenv from "dotenv";
import cors from 'cors';
import logger from "./assets/logger/logger";
import { broadcastOnlineUsers } from "./src/controllers/websocket";

dotenv.config();

export const app: Express = express();

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors({
    origin: "https://crypto-drop.netlify.app",
    credentials: true
}));

broadcastOnlineUsers()

app.listen(port, () => {
    logger.info(`[server]: Server is running at http://localhost:${port}`);
});


