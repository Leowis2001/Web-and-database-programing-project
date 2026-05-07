const express = require('express');
const {
    createWorkout,
    getAllWorkoutRoutines,
    updateWorkout,
    deleteWorkout
} = require('../models/workoutroutine');

const router = express.Router();


router.post("/", async (req, res) => {
    try {
        const { name, description } = req.body;
        
        if (!name) return res.status(400).json({ message: "Name is required" });
        
        const result = await createWorkout(name, description);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.get("/", async (req, res) => {
    try {
        const workouts = await getAllWorkoutRoutines();
        res.json(workouts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.put("/:id", async (req, res) => {
    try {
        const { name, description } = req.body;
        // Logic Fix: You need to pass the updated data along with the ID
        const result = await updateWorkout(req.params.id, name, description);
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.delete("/:id", async (req, res) => {
    try {
        const result = await deleteWorkout(req.params.id);
        res.json({ message: "Workout deleted successfully", result });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



module.exports = router;