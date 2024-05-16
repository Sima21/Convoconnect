const express = require('express');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt'); // Import bcrypt for password hashing
const router = express.Router();

router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        // Check if user with the same username already exists
        const existingUser = await User.findOne({ where: { username } });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }
        // Hash the password before saving it to the database
        const hashedPassword = await bcrypt.hash(password, 10); // Adjust salt rounds as needed
        console.log("Hashed Password:", hashedPassword); // Log hashed password
        const user = new User({ username, email, password: hashedPassword });
        await user.save();
        res.status(201).send("User registered successfully");
    } catch (error) {
        console.error("Register Error:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        // Find the user by username
        const user = await User.findOne({ where: { username } });
        if (!user) {
            console.log("User not found"); // Debug statement
            return res.status(401).json({ message: "Invalid credentials" });
        }
        // Compare the provided password with the hashed password stored in the database
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log("Password comparison failed:", password, user.password); // Debug statement
            return res.status(401).json({ message: "Invalid credentials" });
        }
        // Generate JWT token with the user ID as the payload
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
        console.log("JWT Token:", token); // Debug statement
        // Send the token back to the client
        res.json({ token });
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
