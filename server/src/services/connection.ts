import mysql from 'mysql2'
import dotenv from 'dotenv'
import logger from '../../assets/logger/logger';

dotenv.config({path: "../../.env"})

export const pool = mysql.createPool({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    port: Number(process.env.DATABASE_PORT),
});


pool.getConnection((err, connection) => {
    if (err) {
        return logger.error('Error connecting to MariaDB:', err);
    }
    logger.info("Connected to MariaDB");
    connection.release();
});