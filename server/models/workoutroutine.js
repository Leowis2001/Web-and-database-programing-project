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

    await query(sql);
}

createTable();

async function getAllWorkoutRoutines() {
    let sql = `SELECT * FROM WorkOutRoutine;`;
    return await query(sql);
}

module.exports = { getAllWorkoutRoutines };
