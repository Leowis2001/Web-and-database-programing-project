const express = require('express');
const {
    createUser,
    getAllUsers,
    updateUser,
    deleteUser,
    loginUser
} = require('../models/user');

const router = express.Router();

// --- Registration ---
router.post("/register", async (req, res) => {
    try {
        const { fullName, email, password } = req.body;
        const result = await createUser(fullName, email, password);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// --- Login ---
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await loginUser(email, password);

        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// --- Get All Users ---
router.get("/", async (req, res) => {
    try {
        const users = await getAllUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// --- Update User ---
router.put("/:id", async (req, res) => {
    try {
        const { fullName, email } = req.body;
        const result = await updateUser(req.params.id, fullName, email);
        res.json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// --- Delete User ---
router.delete("/:id", async (req, res) => {
    try {
        // Fixed typo: req.parmams -> req.params
        const result = await deleteUser(req.params.id);
        res.json({ message: "User deleted successfully", result });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
