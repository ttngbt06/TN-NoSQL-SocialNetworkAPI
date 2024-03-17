const mongoose = require('mongoose');

const reactionSchema = new mongoose.Schema({
    thoughtId: { type: mongoose.Schema.Types.ObjectId, ref: 'Thought', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    reactionType: { type: String, enum: ['like', 'love', 'care', 'haha', 'wow', 'sad', 'angry'], required: true },
    createdAt: { type: Date, default: Date.now },
    // Add other reaction attributes
});

const Reaction = mongoose.model('Reaction', reactionSchema);

module.exports = Reaction;
