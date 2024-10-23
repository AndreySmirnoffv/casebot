import { pool } from "../../../assets/db/connection";

export class UserModel {
    getRefByChatId (chatId: string){
        return new Promise((resolve, reject) => {
            const query = "SELECT ref FROM users WHERE chatId = ?";
            pool.query(query, [chatId], (error, results) => {
                if (error) {
                    return reject(error);
                }
                if (results.length === 0) {
                    return resolve(null);
                }
                resolve(results[0].ref);
            });
        });
    }
};
