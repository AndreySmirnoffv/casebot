import { Response } from "express"
import { pool } from "../../../assets/db/connection"

export async function handlePrice(price: number, tableName: string, network: string, res: Response) {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM ?? WHERE network = ?`, [tableName, network], (error, results) => {
            if (error) {
                return res.status(404).send({ message: "Ошибка либо с подключением к БД либо с передачей параметров: " + error });
            }

            const amounts = results.map(result => result.amount * price);
            res.status(200).send({ amounts });
        });
    });
}

