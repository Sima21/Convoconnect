//backend\routes\groupRoutes.js
const express = require('express');
const nodemailer = require('nodemailer');
const Group = require('../models/group');
<<<<<<< HEAD
const User = require('../models/user');
const UserGroup = require('../models/userGroup');
=======
>>>>>>> ab7617cc7a846cd5bf26e7e2278ad7529c022dfe
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

<<<<<<< HEAD
router.post('/:groupId/generate-meet', protect, async (req, res) => {
    try {
        const { groupId } = req.params;
        const group = await Group.findOne({ where: { id: groupId, owner: req.user.id } });

        if (!group) {
            return res.status(404).json({ error: 'Group not found or not owned by user' });
        }

        const meetLink = `https://localhost:8443/${group.name}-${Date.now()}`;
        group.meetLink = meetLink;
        await group.save();

        res.status(200).json({ message: 'Meet link generated successfully', meetLink });
    } catch (error) {
        console.error('Error generating meet link:', error);
        res.status(500).json({ error: 'Failed to generate meet link' });
    }
});

router.get('/', protect, async (req, res) => {
    try {
        const groups = await Group.findAll({
            where: {
                owner: req.user.id
            },
            include: {
                model: User,
                through: UserGroup,
                as: 'groupUsers'
=======
router.get('/', protect, async (req, res) => {
    try {
        const groups = await Group.findAll({
            where: {
                owner: req.user.id
>>>>>>> ab7617cc7a846cd5bf26e7e2278ad7529c022dfe
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
<<<<<<< HEAD
    const senderUsername = req.user.username;
=======
>>>>>>> ab7617cc7a846cd5bf26e7e2278ad7529c022dfe

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
<<<<<<< HEAD
            subject: 'You\'re Invited to Join Our Group!',
            html: `
                <h2>Hello,</h2>
                <p>You have been invited by <strong>${senderUsername} (${senderEmail})</strong> to join the group "<strong>${group.name}</strong>".</p>
                <p>Click the button below to join us:</p>
                <p><a href="http://localhost:3000/join/${group.id}" style="padding: 10px 20px; color: white; background-color: blue; text-decoration: none;">Join Group</a></p>
                <p>Looking forward to seeing you!</p>
                <p>Best regards,<br/>The Team</p>
            `
=======
            subject: 'Group Invitation',
            text: `You have been invited to join the group "${group.name}" by ${senderEmail}.`
>>>>>>> ab7617cc7a846cd5bf26e7e2278ad7529c022dfe
        };

        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Invitation sent successfully' });
    } catch (error) {
        console.error('Error sending invitation:', error);
        res.status(500).json({ error: 'Failed to send invitation' });
    }
});

<<<<<<< HEAD
router.post('/join/:groupId', protect, async (req, res) => {
    const { groupId } = req.params;
    const userId = req.user.id;

    try {
        const group = await Group.findByPk(groupId);
        if (!group) {
            return res.status(404).json({ error: 'Group not found' });
        }

        // Add user to group
        await UserGroup.create({ userId, groupId });

        res.status(200).json({ message: 'Joined group successfully', meetLink: group.meetLink });
    } catch (error) {
        console.error('Error joining group:', error);
        res.status(500).json({ error: 'Failed to join group' });
    }
});

=======
>>>>>>> ab7617cc7a846cd5bf26e7e2278ad7529c022dfe
module.exports = router;
