import { listStripePayouts } from "../models/db.stripe.model";
import { redis } from "../services/redis.service";
import { getCasesAmount } from "./cases.controller";
import { Request, Response } from "express";
import { getRubPayoutList } from "./payment.controller";
import { allUsers } from "./users.controller";

export async function getAllData(req: Request, res: Response): Promise<any> {
    try {
        const [casesAmount, rubPayoutList, stripePayouts, onlineUsers, users] = await Promise.all([
            await getCasesAmount(req, res),
            getRubPayoutList(),
            listStripePayouts(),
            redis.get("onlineUsers"),
            allUsers()
        ]);

        const withdrawalUsers = Math.round(rubPayoutList + stripePayouts)

        const response = {
            casesAmount,     
            withdrawalUsers,   
            onlineUsers: Number(onlineUsers) || 0, 
            users
        };

        return res.json(response);
    } catch (error) {
        console.error("Error fetching data:", error);
        return res.status(500).json({ message: "Failed to fetch data", error });
    }
}
