const express = require('express');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();
const { logEvent } = require('../utils/logger'); // Include the logEvent function

// Existing JWT authentication routes
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    logEvent('info', `Login attempt for username: ${username}`);
    console.log(`Login attempt for username: ${username}`);

    try {
        const user = await User.findOne({ where: { username } });

        if (!user) {
            logEvent('warn', `Login failed: User not found - ${username}`);
            console.log(`Login failed: User not found - ${username}`);
            return res.status(400).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            logEvent('warn', `Login failed: Invalid credentials - ${username}`);
            console.log(`Login failed: Invalid credentials - ${username}`);
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        logEvent('info', `User logged in successfully: ${username}`);
        console.log(`User logged in successfully: ${username}`);
        res.json({ token, username: user.username });
    } catch (error) {
        logEvent('error', `Login Error for ${username}: ${error.message}`);
        console.error(`Login Error for ${username}: ${error.message}`);
        res.status(500).json({ message: 'Server error' });
    }
});

router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    logEvent('info', `Registration attempt for username: ${username}`);
    console.log(`Registration attempt for username: ${username}`);

    try {
        const userExists = await User.findOne({ where: { username } });

        if (userExists) {
            logEvent('warn', `Registration failed: User already exists - ${username}`);
            console.log(`Registration failed: User already exists - ${username}`);
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
        });

        const token = jwt.sign({ userId: newUser.id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        logEvent('info', `User registered successfully: ${username}`);
        console.log(`User registered successfully: ${username}`);
        res.json({ token, username: newUser.username });
    } catch (error) {
        logEvent('error', `Registration Error for ${username}: ${error.message}`);
        console.error(`Registration Error for ${username}: ${error.message}`);
        res.status(500).json({ message: 'Server error' });
    }
});

// Google OAuth routes
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
        const token = jwt.sign({ userId: req.user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        logEvent('info', `User logged in via Google successfully: ${req.user.username}`);
        console.log(`User logged in via Google successfully: ${req.user.username}`);
        res.redirect(`http://localhost:3000/dashboard?token=${token}&username=${req.user.username}`);
    }
);

router.get('/logout', (req, res) => {
    logEvent('info', 'User logged out');
    console.log('User logged out');
    req.logout();
    res.redirect('/');
});

module.exports = router;
