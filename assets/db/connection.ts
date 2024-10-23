import mysql from 'mysql2'
import logger from '../logger/logger'

export const pool = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "casebot",
    port: 3306
})


pool.connect(error => {
    if(error){
        return logger.error("Database error:", error)
    }

    logger.info("Successfully connected to the Database")
})