const express = require('express');
const router = express.Router();
const Thought = require('../models/thought');

// Get all thoughts
router.get('/api/thoughts', async (req, res) => {
    try {
        const thoughts = await Thought.find();
        res.json(thoughts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a new thought
router.post('/api/thoughts', async (req, res) => {
    const thought = new Thought({
        userId: req.body.userId,
        thoughtText: req.body.thoughtText
        // Add other thought attributes here
    });
    try {
        const newThought = await thought.save();
        res.status(201).json(newThought);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update a thought
router.put('/api/thoughts/:id', async (req, res) => {
    try {
        const thought = await Thought.findById(req.params.id);
        if (thought == null) {
            return res.status(404).json({ message: 'Thought not found' });
        }
        thought.thoughtText = req.body.thoughtText;
        // Update other thought attributes here
        const updatedThought = await thought.save();
        res.json(updatedThought);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a thought
router.delete('/api/thoughts/:id', async (req, res) => {
    try {
        const thought = await Thought.findById(req.params.id);
        if (thought == null) {
            return res.status(404).json({ message: 'Thought not found' });
        }
        await thought.remove();
        res.json({ message: 'Thought deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
