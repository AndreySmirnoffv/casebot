import { pool } from "../db/connection.js";

export async function checkUserExists(id, callback) {
    pool.query('SELECT * FROM users WHERE id = ?', [id], (error, results) => {
        if (error) {
            console.error("Error checking user:", error);
            return callback(error, null);
        }
        callback(null, results.length > 0);
    });
}

export async function addUser(
    id,
    chatId,
    firstName,
    lastName,
    username,
    ref,
    origin,
    balance,
    balanceRub,
    balanceCrypto,
    callback
) {
    const query = 'INSERT INTO users (id, username, firstName, lastName, ref, origin, balance, balanceRub, balanceCrypto, chatId) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    
    pool.query(query, [id, username, firstName, lastName, ref, origin, balance, balanceRub, balanceCrypto, chatId], (error, results) => {
        if (error) {
            console.error("Error adding user:", error);
            return callback(error);
        }
        callback(null);
        return console.info("User added successfully");
    });
}
