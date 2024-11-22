import mysql from 'mysql2'

export const pool = mysql.createPool({
    host: "127.0.0.1",
    user: "root",
    password: "root",
    database: "casebot",
    port: 3306
})


pool.getConnection((err, connection) => {
    if (err) {
        return console.error('Error connecting to MariaDB:', err);
    }
    console.info("Connected to MariaDB");
    connection.release();
});