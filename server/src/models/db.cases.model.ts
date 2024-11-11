import { pool } from "../../assets/db/connection";
import logger from "../../assets/logger/logger";
import {QueryError, QueryResult, RowDataPacket} from "mysql2";
import {getCoinData} from "../controllers/crypto.controller"; // Импортируем RowDataPacket

export async function getCase(tableName: string) {
    const query = `SELECT * FROM ??;`;
    return new Promise((resolve, reject) => {
        pool.query(query, [tableName], (error, results) => {
            if (error) {
                logger.error("error: " + error);
                return reject(error); 
            }

            resolve(results);
        });
    });
}

export async function insertCaseCounter(){
    const query = "UPDATE cases SET casesAmount = casesAmount + 1;"
    return new Promise((resolve, reject) => {
        pool.query(query, (error, results) => {
            if(error){
                return reject(error)
            }

            resolve(results)
        })
    })
}

export async function randomDrop(tableName: string): Promise<RowDataPacket[]> {
    console.log("randomDrop - Запрос уникальных имён из таблицы:", tableName);
    const uniqueNamesQuery = `SELECT DISTINCT name FROM ??`;

    const uniqueNames: string[] = await new Promise<string[]>((resolve, reject) => {
        pool.query(uniqueNamesQuery, [tableName], (error, results) => {
            if (error) {
                console.error("randomDrop - Ошибка при получении уникальных имён:", error);
                return reject(new Error("Ошибка при получении уникальных имен: " + error.message));
            }

            console.log("randomDrop - Уникальные имена, полученные из базы данных:", results);

            const names: string[] = (results as RowDataPacket[]).map(result => {
                const symbol: string = result.name;
                console.log("randomDrop - Добавление символа:", symbol);
                return symbol;
            });

            resolve(names);

        });
    });

    console.log("randomDrop - Полученные уникальные имена после обработки:", uniqueNames);

    for (const symbol of uniqueNames) {
        console.log(symbol)
        
    }

    const query = `
    SELECT * FROM ?? 
    WHERE name IN (?)
    `;

    return new Promise<RowDataPacket[]>((resolve, reject) => {
        pool.query(query, [tableName, uniqueNames], (error, results) => {
            if (error) {
                console.error("randomDrop - Ошибка при выборке данных:", error);
                return reject(new Error("Ошибка при выборке данных: " + error.message));
            }
            const rows = results as RowDataPacket[];
            console.log("randomDrop - Данные, полученные из выборки:", rows);
            resolve(rows);
        });
    });
}


export async function getCasesAmountDb(): Promise<unknown> {
    const query = "SELECT casesAmount FROM cases";

    return new Promise((resolve, reject) => {
        pool.query(query, (error, results) => {
            if (error) {
                return reject(error);
            }

            const rows = results as RowDataPacket[];
            resolve(rows[0]);
        });
    });
}
 