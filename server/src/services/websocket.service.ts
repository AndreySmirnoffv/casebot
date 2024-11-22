import { WebSocketServer } from "ws";
import dotenv from 'dotenv'

dotenv.config({path: "../../.env"})
export const wss = new WebSocketServer({ port: Number(process.env.WEB_SOCKETS_PORT) });
