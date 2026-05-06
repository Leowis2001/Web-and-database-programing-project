const express = require('express');
const {
    createWorkout,
    getAllWorkoutRoutines,
    updateWorkout,
    deleteWorkout
} = require('../models/workoutroutine');
const router = express.Router();


router.post("/", async (req, res) => {
    const { name, description } = req.body;
    const result = await createWorkout(name, description);
    res.json(result);
});


router.get("/", async (req, res) => {
    const workouts = await getAllWorkoutRoutines();
    res.json(workouts);
});


router.put("/:id", async (req, res) => {
    const {name, description } = req.body;
    const result = await updateWorkout(req.params.id);
    res.json(result);
});


router.delete("/:id", async (req, res) => {
    const result = await deleteWorkout(req.params.id);
    res.json(result);

});




router.get('/', (req, res) => {
    try {
        const uses = WorkOutRoutine.getWorkOutRoutines();
        res.send(WorkOutRoutine);
    } catch (err) {
        res.status(401).send({message: error.message});
    }
})

module.exports = router;
