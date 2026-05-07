const { query } = require("./db_connect");
const bcrypt = require("bcrypt");

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


async function createUser(fullName, email, password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const sql = `
    INSERT INTO User (FullName, UserEMAIL, Password)
    VALUES (?, ?, ?)
    `;

    return await query(sql, [fullName, email, hashedPassword]);
}

async function getAllUsers() {
    let sql = `SELECT * FROM User;`;
    return await query(sql);
}


async function updateUser(id, fullName, email) {
    const sql = `
    UPDATE User
    SET FullName = ?, UserEMAIL = ? 
    WHERE UserID = ?
    `;
    return await query(sql, [fullName, email, id]);
}


async function deleteUser(id) {
    return await query(`DELETE FROM User WHERE UserID = ?`, [id]);

}


async function loginUser(email, password) {
    const sql = `SELECT * FROM User WHERE UserEMAIL = ?`;
    const result = await query(sql, [email]);

    if (result.length === 0) return null;

    const user = result[0];
    const match = await bcrypt.compare(password, user.Password);

    if (!match) return null;

    return user;
}

module.exports = { 
    createUser,
    getAllUsers,
    updateUser,
    deleteUser,
    loginUser
 };