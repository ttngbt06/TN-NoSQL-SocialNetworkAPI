const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/social_network_db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB successfully');
});

module.exports = db;
