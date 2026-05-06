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

async function createWorkout(name, description) {
    return await query(
        `INSERT INTO WotkoutRoutine (Name, Descrption) VALUES (?, ?)`,
        [name, description]
    );
}

async function getAllWorkoutRoutines() {
    let sql = `SELECT * FROM WorkOutRoutine;`;
    return await query(sql);
}


async function updateWorkout(id, name, descrption) {
    return await query(
        `UPDATE WorkoutRoutine SET Name=?, Description=? WHERE WorkoutID=?`,
        [name, descrption, id]
    );

}


async function deleteWorkout(id) {
    return await query(
        `DELETE FROM WorkoutRoutine WHERE WorkoutID=?`,
        [id]
    );
}

module.exports = { 
    createWorkout,
    getAllWorkoutRoutines,
    updateWorkout,
    deleteWorkout
 };
