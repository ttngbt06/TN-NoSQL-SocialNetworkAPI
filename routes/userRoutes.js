const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Friend = require('../models/friend');

// Get all users
router.get('/api/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a new user
router.post('/api/users', async (req, res) => {
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        dateOfBirth: req.body.dateOfBirth,
        // Add other user attributes here
    });
    try {
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update a user
router.put('/api/users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (user == null) {
            return res.status(404).json({ message: 'User not found' });
        }
        if (req.body.username != null) {
            user.username = req.body.username;
        }
        if (req.body.email != null) {
            user.email = req.body.email;
        }
        if (req.body.firstName != null) {
            user.firstName = req.body.firstName;
        }
        if (req.body.lastName != null) {
            user.lastName = req.body.lastName;
        }
        if (req.body.dateOfBirth != null) {
            user.dateOfBirth = req.body.dateOfBirth;
        }
        // Update other user attributes here
        const updatedUser = await user.save();
        res.json(updatedUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a user
router.delete('/api/users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (user == null) {
            return res.status(404).json({ message: 'User not found' });
        }
        await user.remove();
        res.json({ message: 'User deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Add a friend
router.post('/api/users/:userId/friends', async (req, res) => {
    try {
        const { userId } = req.params;
        const friendId = req.body.friendId;

        const friend = new Friend({
            userId: userId,
            friendId: friendId
        });

        const newFriend = await friend.save();
        res.status(201).json(newFriend);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
