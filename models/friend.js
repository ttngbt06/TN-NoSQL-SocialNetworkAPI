const mongoose = require('mongoose');

const friendSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    friendId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    status: { type: String, enum: ['pending', 'accepted'], default: 'pending' },
    // Add other friend attributes
});

const Friend = mongoose.model('Friend', friendSchema);

module.exports = Friend;
