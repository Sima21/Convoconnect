// backend/routes/authRoutes.js
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

<<<<<<< HEAD
=======
// Existing JWT authentication routes
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

>>>>>>> ab7617cc7a846cd5bf26e7e2278ad7529c022dfe
    try {
        const user = await User.findOne({ where: { username } });

        if (!user) {
<<<<<<< HEAD
            logEvent('warn', `Login failed: User not found - ${username}`);
            console.log(`Login failed: User not found - ${username}`);
=======
>>>>>>> ab7617cc7a846cd5bf26e7e2278ad7529c022dfe
            return res.status(400).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
<<<<<<< HEAD
            logEvent('warn', `Login failed: Invalid credentials - ${username}`);
            console.log(`Login failed: Invalid credentials - ${username}`);
=======
>>>>>>> ab7617cc7a846cd5bf26e7e2278ad7529c022dfe
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

<<<<<<< HEAD
        logEvent('info', `User logged in successfully: ${username}`);
        console.log(`User logged in successfully: ${username}`);
        res.json({ token, username: user.username });
    } catch (error) {
        logEvent('error', `Login Error for ${username}: ${error.message}`);
        console.error(`Login Error for ${username}: ${error.message}`);
=======
        res.json({ token, username: user.username });
    } catch (error) {
        console.error('Login Error:', error);
>>>>>>> ab7617cc7a846cd5bf26e7e2278ad7529c022dfe
        res.status(500).json({ message: 'Server error' });
    }
});

router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

<<<<<<< HEAD
    logEvent('info', `Registration attempt for username: ${username}`);
    console.log(`Registration attempt for username: ${username}`);

=======
>>>>>>> ab7617cc7a846cd5bf26e7e2278ad7529c022dfe
    try {
        const userExists = await User.findOne({ where: { username } });

        if (userExists) {
<<<<<<< HEAD
            logEvent('warn', `Registration failed: User already exists - ${username}`);
            console.log(`Registration failed: User already exists - ${username}`);
=======
>>>>>>> ab7617cc7a846cd5bf26e7e2278ad7529c022dfe
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

<<<<<<< HEAD
        logEvent('info', `User registered successfully: ${username}`);
        console.log(`User registered successfully: ${username}`);
        res.json({ token, username: newUser.username });
    } catch (error) {
        logEvent('error', `Registration Error for ${username}: ${error.message}`);
        console.error(`Registration Error for ${username}: ${error.message}`);
=======
        res.json({ token, username: newUser.username });
    } catch (error) {
        console.error('Registration Error:', error);
>>>>>>> ab7617cc7a846cd5bf26e7e2278ad7529c022dfe
        res.status(500).json({ message: 'Server error' });
    }
});

// Google OAuth routes
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
        const token = jwt.sign({ userId: req.user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
<<<<<<< HEAD
        logEvent('info', `User logged in via Google successfully: ${req.user.username}`);
        console.log(`User logged in via Google successfully: ${req.user.username}`);
=======
>>>>>>> ab7617cc7a846cd5bf26e7e2278ad7529c022dfe
        res.redirect(`http://localhost:3000/dashboard?token=${token}&username=${req.user.username}`);
    }
);

router.get('/logout', (req, res) => {
<<<<<<< HEAD
    logEvent('info', 'User logged out');
    console.log('User logged out');
=======
>>>>>>> ab7617cc7a846cd5bf26e7e2278ad7529c022dfe
    req.logout();
    res.redirect('/');
});

module.exports = router;
