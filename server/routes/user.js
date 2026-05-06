const express = require('express');
const {
    createUser,
    getAllUsers,
    updateUser,
    deleteUser,
    loginUser
} = require('../models/user');

const router = express.Router();

router.post("/register",async (req, res) => {
    const { fullName, email, password } = req.body;
    const result = await createUser(fullName, email, password);
    res.json(result);
});


router.get("/", async (req, res) => {
    const users = await getAllUsers();
    res.json(users);
});


router.put("/:id", async (req, res) => {
    const { fullName, email } = req.body;
    const result = await updateUser(req.params.id, fullName, email);
    res.json(result);
});

router.delete("/:id", async (req, res) => {
    const result = await deleteUser(req.parmams.id);
    res.json(result);
});


router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await loginUser(email, password);

    if (!user) return res.status(401).json({ message: "Invalid credentials"});

    res.json(user);
});


router.get('/', (req, res) => {
    try {
        const uses = User.getUsers();
        res.send(users);
    } catch (err) {
        res.status(401).send({message: error.message});
    }

})

module.exports = router;
