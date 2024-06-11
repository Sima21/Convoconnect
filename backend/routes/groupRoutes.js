const express = require('express');
const nodemailer = require('nodemailer');
const { Sequelize } = require('sequelize');
const Group = require('../models/group');
const User = require('../models/user');
const UserGroup = require('../models/userGroup');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/create', protect, async (req, res) => {
    try {
        const { name } = req.body;
        const group = await Group.create({ name, owner: req.user.id });
        await UserGroup.create({ userId: req.user.id, groupId: group.id }); // Add the owner to the user-group relationship
        res.status(201).json({ message: 'Group created successfully', group });
    } catch (error) {
        console.error('Error creating group:', error);
        res.status(500).json({ error: error.message });
    }
});

router.post('/:groupId/generate-meet', protect, async (req, res) => {
    try {
        const { groupId } = req.params;
        const group = await Group.findOne({ where: { id: groupId, owner: req.user.id } });

        if (!group) {
            return res.status(404).json({ error: 'Group not found or not owned by user' });
        }

        const userEmail = req.user.email;
        const sanitizedEmail = userEmail.replace(/[^a-zA-Z0-9]/g, '-');
        const meetLink = `https://localhost:8443/jitsi/${sanitizedEmail}-${Date.now()}`;
        
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
                [Sequelize.Op.or]: [
                    { owner: req.user.id },
                    { '$members.UserGroup.userId$': req.user.id }
                ]
            },
            include: [
                {
                    model: User,
                    as: 'ownerDetails',
                    attributes: ['id', 'username']
                },
                {
                    model: User,
                    as: 'members',
                    attributes: ['id', 'username'],
                    through: { attributes: [] }
                }
            ]
        });

        const formattedGroups = groups.map(group => ({
            ...group.toJSON(),
            isOwner: group.owner === req.user.id
        }));

        res.json({ groups: formattedGroups });
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
    const senderUsername = req.user.username;

    try {
        const group = await Group.findOne({ where: { id: groupId, owner: req.user.id } });
        if (!group) {
            return res.status(404).json({ error: 'Group not found or not owned by user' });
        }

        // Ensure the group has a meet link
        if (!group.meetLink) {
            const userEmail = req.user.email;
            const sanitizedEmail = userEmail.replace(/[^a-zA-Z0-9]/g, '-');
            const meetLink = `https://localhost:8443/jitsi/${sanitizedEmail}-${Date.now()}`;
            group.meetLink = meetLink;
            await group.save();
        }

        const invitedUser = await User.findOne({ where: { email } });
        if (!invitedUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Check if the user is already a member of the group
        const existingUserGroup = await UserGroup.findOne({ where: { userId: invitedUser.id, groupId: group.id } });
        if (existingUserGroup) {
            return res.status(400).json({ error: 'User is already a member of the group' });
        }

        await UserGroup.create({ userId: invitedUser.id, groupId: group.id });

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
            subject: 'You\'re Invited to Join Our Group!',
            html: `
                <h2>Hello,</h2>
                <p>You have been invited by <strong>${senderUsername} (${senderEmail})</strong> to join the group "<strong>${group.name}</strong>".</p>
                <p>Click the link below to join the meeting:</p>
                <p><a href="${group.meetLink}" style="padding: 10px 20px; color: white; background-color: blue; text-decoration: none;">Join Meeting</a></p>
                <p>Looking forward to seeing you!</p>
                <p>Best regards,<br/>The Team</p>
            `
        };

        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Invitation sent successfully' });
    } catch (error) {
        console.error('Error sending invitation:', error);
        res.status(500).json({ error: 'Failed to send invitation' });
    }
});

router.post('/join/:groupId', protect, async (req, res) => {
    const { groupId } = req.params;
    const userId = req.user.id;

    try {
        const group = await Group.findByPk(groupId);
        if (!group) {
            return res.status(404).json({ error: 'Group not found' });
        }

        const userGroup = await UserGroup.findOne({ where: { userId, groupId } });
        if (!userGroup) {
            await UserGroup.create({ userId, groupId });
        }

        res.status(200).json({ message: 'Joined group successfully', meetLink: group.meetLink });
    } catch (error) {
        console.error('Error joining group:', error);
        res.status(500).json({ error: 'Failed to join group' });
    }
});

router.post('/:groupId/share', protect, async (req, res) => {
    const { groupId } = req.params;
    const { email } = req.body;

    try {
        const group = await Group.findByPk(groupId);
        if (!group || group.owner !== req.user.id) {
            return res.status(404).json({ error: 'Group not found or you do not have permission to share this group' });
        }

        const userToShareWith = await User.findOne({ where: { email } });
        if (!userToShareWith) {
            return res.status(404).json({ error: 'User not found' });
        }

        await UserGroup.create({ userId: userToShareWith.id, groupId: group.id });

        res.status(200).json({ message: 'Group shared successfully' });
    } catch (error) {
        console.error('Error sharing group:', error);
        res.status(500).json({ error: 'Failed to share group' });
    }
});

module.exports = router;
