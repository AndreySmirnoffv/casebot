import { redis } from '../services/redis.service';
import { wss } from '../services/websocket.service';

redis.set("onlineUsers", "0");

wss.on("connection", async (ws) => {
    try {
        const onlineUsers = await redis.incr("onlineUsers");
        console.log(`New client connected. Online: ${onlineUsers}`);
        broadcastOnlineUsers();

        ws.on("close", async () => {
            try {
                const onlineUsers = await redis.decr("onlineUsers");
                console.log(`Client disconnected. Online: ${onlineUsers}`);
                broadcastOnlineUsers();
            } catch (err) {
                console.error("Error handling close event:", err);
            }
        });
    } catch (err) {
        console.error("Error handling connection:", err);
    }
});

export async function broadcastOnlineUsers() {
    try {
        const onlineUsers = await redis.get("onlineUsers");
        const message = JSON.stringify({ type: "onlineUsers", count: onlineUsers });
        wss.clients.forEach((client) => {
            if (client.readyState === client.OPEN) {
                client.send(message);
            }
        });
    } catch (err) {
        console.error("Error broadcasting online users:", err);
    }
}
