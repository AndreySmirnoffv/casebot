import { pool } from "../../../assets/db/connection";
import logger from "../../../assets/logger/logger";

export async function insertStripePayment(response, userId: string, res){
    pool.query("INSERT INTO payments (id, amount, userId)", [response.id, response.amount, userId], (results, error => {
        if (error){
            logger.error("error inserting database", error)
            return res.status(500).send("error inserting payment to database")
        }

        res.json(results[0])
    }))
}
