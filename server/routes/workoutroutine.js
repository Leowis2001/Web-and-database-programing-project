const express = require('express');
const WoekOutRoutine = require('../models/workoutroutine');
const router = express.Router();

router.get('/', (req, res) => {
    try {
        const uses = WorkOutRoutine.getWorkOutRoutines();
        res.send(WorkOutRoutine);
    } catch (err) {
        res.status(401).send({message: error.message});
    }
})

module.exports = router;
