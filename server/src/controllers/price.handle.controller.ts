import { Response } from "express";
import { pool } from "../../assets/db/connection";
import { IResult } from "../interfaces/IResult";

export async function handlePrice(
    price: number,
    tableName: string,
    network: string,
    res: Response
) {
    try {
        const results = await new Promise<IResult[]>((resolve, reject) => {
            pool.query(`SELECT * FROM ?? WHERE network = ?`, [tableName, network], (error, results) => {
                if (error) {
                    return reject(error);
                }

                resolve(results as IResult[]);
            });
        });

        const amounts = results.map(result => result.amount * price);
        res.status(200).send({ amounts });
    } catch (error) {
        res.status(500).send({ message: "Ошибка с подключением к БД либо с передачей параметров: " + error });
    }
}
