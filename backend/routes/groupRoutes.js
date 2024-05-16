const express = require('express');
const Group = require('../models/group'); 
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { name, ownerId } = req.body;
        const group = await Group.create({ name, owner: ownerId });
        res.status(201).send("Group created successfully");
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        // Fetch groups data from the database using Sequelize
        const groups = await Group.findAll(); // Using Sequelize's findAll method
        res.json({ groups });
    } catch (error) {
        console.error("Fetch Groups Error:", error);
        res.status(500).json({ error: 'Failed to fetch groups' });
    }
});

module.exports = router;
