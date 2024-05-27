//backend\routes\groupRoutes.js
const express = require('express');
const nodemailer = require('nodemailer');
const Group = require('../models/group');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/create', protect, async (req, res) => {
    try {
        const { name } = req.body;
        const group = await Group.create({ name, owner: req.user.id });
        res.status(201).json({ message: 'Group created successfully', group });
    } catch (error) {
        console.error('Error creating group:', error);
        res.status(500).json({ error: error.message });
    }
});

router.get('/', protect, async (req, res) => {
    try {
        const groups = await Group.findAll({
            where: {
                owner: req.user.id
            }
        });
        res.json({ groups });
    } catch (error) {
        console.error('Fetch Groups Error:', error);
        res.status(500).json({ error: 'Failed to fetch groups' });
    }
});

router.delete('/:id', protect, async (req, res) => {
    try {
        const groupId = req.params.id;
        const group = await Group.findOne({
            where: {
                id: groupId,
                owner: req.user.id
            }
        });

        if (!group) {
            return res.status(404).json({ error: 'Group not found' });
        }

        await group.destroy();
        res.status(200).json({ message: 'Group deleted successfully' });
    } catch (error) {
        console.error('Error deleting group:', error);
        res.status(500).json({ error: 'Failed to delete group' });
    }
});

router.post('/:groupId/invite', protect, async (req, res) => {
    const { email } = req.body;
    const { groupId } = req.params;
    const senderEmail = req.user.email;

    try {
        const group = await Group.findOne({ where: { id: groupId, owner: req.user.id } });
        if (!group) {
            return res.status(404).json({ error: 'Group not found or not owned by user' });
        }

        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const mailOptions = {
            from: senderEmail,
            to: email,
            subject: 'Group Invitation',
            text: `You have been invited to join the group "${group.name}" by ${senderEmail}.`
        };

        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Invitation sent successfully' });
    } catch (error) {
        console.error('Error sending invitation:', error);
        res.status(500).json({ error: 'Failed to send invitation' });
    }
});

module.exports = router;
