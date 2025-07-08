const mongoose = require('mongoose');

// Connect to MongoDB using Mongoose
// Ensure that the DB_CONNECT environment variable is set in your .env file
function connectToDb() {
    mongoose.connect(process.env.DB_CONNECT)
        .then(() => console.log('✅ Connected to MongoDB'))
        .catch(err => console.error('❌ MongoDB connection failed:\n', err.message));
}

module.exports = connectToDb;
