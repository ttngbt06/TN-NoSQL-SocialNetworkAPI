const mongoose = require('mongoose');

const thoughtSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    thoughtText: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date },
    reactions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Reaction' }], // Reference to Reaction model
    // Add other thought attributes
});

const Thought = mongoose.model('Thought', thoughtSchema);

module.exports = Thought;
