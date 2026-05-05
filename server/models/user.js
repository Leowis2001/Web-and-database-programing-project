const { query } = require("./db_connect");

async function createTable() {
    let sql = `
    CREATE TABLE IF NOT EXISTS User (
        UserID INT AUTO_INCREMENT PRIMARY KEY,
        FullName VARCHAR(100) NOT NULL,
        UserEMAIL VARCHAR(175) UNIQUE NOT NULL,
        Password VARCHAR(200) NOT NULL
    )`;
    
    await query(sql);
}

createTable();

async function getAllUsers() {
    let sql = `SELECT * FROM User;`;
    return await query(sql);
}

module.exports = { getAllUsers };