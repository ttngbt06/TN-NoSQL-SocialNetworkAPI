const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    firstName: { type: String },
    lastName: { type: String },
    dateOfBirth: { type: Date },
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Friend' }], // Reference to Friend model

});

const User = mongoose.model('User', userSchema);

module.exports = User;