const express = require('express');
const router = express.Router();
const Reaction = require('../models/reaction');

// Get all reactions
router.get('/api/reactions', async (req, res) => {
    try {
        const reactions = await Reaction.find();
        res.json(reactions);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a new reaction
router.post('/api/reactions', async (req, res) => {
    const reaction = new Reaction({
        thoughtId: req.body.thoughtId,
        userId: req.body.userId,
        reactionType: req.body.reactionType
        // Add other reaction attributes here
    });
    try {
        const newReaction = await reaction.save();
        res.status(201).json(newReaction);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a reaction
router.delete('/api/reactions/:id', async (req, res) => {
    try {
        const reaction = await Reaction.findById(req.params.id);
        if (reaction == null) {
            return res.status(404).json({ message: 'Reaction not found' });
        }
        await reaction.remove();
        res.json({ message: 'Reaction deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
