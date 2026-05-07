const { query } = require("./db_connect");

async function createTable() {
    let sql = `
    CREATE TABLE IF NOT EXISTS WorkOutRoutine (
     WorkoutID INT AUTO_INCREMENT PRIMARY KEY,
     WorkoutName VARCHAR(200) NOT NULL,
     WorkoutDescription TEXT,
     EstimatedTime VARCHAR(100),
     RestTimeInfo VARCHAR(100),
     UserID INT NOT NULL,
     CONSTRAINT fk_user_routine FOREIGN KEY (UserID) REFERENCES User(UserID) ON DELETE CASCADE
    )`;

    try {
        await query(sql);
    } catch (err) {
        console.error("Error creating WorkOutRoutine table:", err.message);
    }
}

createTable();

// Note: Added userId since the table requires it!
async function createWorkout(name, description, userId) {
    const sql = `INSERT INTO WorkOutRoutine (WorkoutName, WorkoutDescription, UserID) VALUES (?, ?, ?)`;
    return await query(sql, [name, description, userId]);
}

async function getAllWorkoutRoutines() {
    const sql = `SELECT * FROM WorkOutRoutine;`;
    return await query(sql);
}

async function updateWorkout(id, name, description) {
    const sql = `
        UPDATE WorkOutRoutine 
        SET WorkoutName = ?, WorkoutDescription = ? 
        WHERE WorkoutID = ?`;
    return await query(sql, [name, description, id]);
}

async function deleteWorkout(id) {
    const sql = `DELETE FROM WorkOutRoutine WHERE WorkoutID = ?`;
    return await query(sql, [id]);
}

module.exports = { 
    createWorkout,
    getAllWorkoutRoutines, 
    updateWorkout,
    deleteWorkout
};