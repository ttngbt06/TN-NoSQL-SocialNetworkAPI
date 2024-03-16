const express = require('express');
const router = express.Router();
const Friend = require('../models/friend');

// Get all friends
router.get('/api/friends', async (req, res) => {
    try {
        const friends = await Friend.find();
        res.json(friends);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a new friend
router.post('/api/friends', async (req, res) => {
    const friend = new Friend({
        userId: req.body.userId,
        friendId: req.body.friendId,
        status: req.body.status
        // Add other friend attributes here
    });
    try {
        const newFriend = await friend.save();
        res.status(201).json(newFriend);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update friend status
router.put('/api/friends/:id', async (req, res) => {
    try {
        const friend = await Friend.findById(req.params.id);
        if (friend == null) {
            return res.status(404).json({ message: 'Friend not found' });
        }
        friend.status = req.body.status;
        // Update other friend attributes here
        const updatedFriend = await friend.save();
        res.json(updatedFriend);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a friend
router.delete('/api/friends/:id', async (req, res) => {
    try {
        const friend = await Friend.findById(req.params.id);
        if (friend == null) {
            return res.status(404).json({ message: 'Friend not found' });
        }
        await friend.remove();
        res.json({ message: 'Friend deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
