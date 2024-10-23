import { pool } from "../db/connection"
import logger from "../logger/logger"

export async function checkUserExists(id: number, callback: (error: Error | null, exists: boolean) => void): Promise<void> {
    pool.query('SELECT * FROM users WHERE id = ?', [id], (error, results) => {
        if (error) {
            logger.error("Error checking user:", error);
            return callback(error, null);
        }
        callback(null, results.length > 0);
    });
}

export async function addUser(
    id: number,
    chatId: number,
    firstName: string,
    lastName: string,
    username: string,
    ref: string,
    from: number | null,
    balance: number,
    balanceRub: number,
    cryptoBalance: number,
    callback: (error: Error | null) => void
) {
    const query = 'INSERT INTO users (id, chatId, firstName, lastName, username, ref, origin, balance, balanceRub, cryptoBalance) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
    
    pool.query(query, [id, chatId, firstName, lastName, username, ref, from, balance, balanceRub, cryptoBalance], (error, results) => {
        if (error) {
            logger.error("Error adding user:", error);
            return callback(error);
        }
        callback(null);
        logger.info("User added successfully");
    });
}
