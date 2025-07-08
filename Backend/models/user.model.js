const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const  jwt = require('jsonwebtoken');

// Define the user schema
// This schema defines the structure of the user document in the MongoDB database
const userSchema = new mongoose.Schema({
    // fullname is an object containing firstname and lastname
    // Both fields are required and must be at least 2 characters long
    fullname :{
        firstname:{
            type: String,
            required: true,
            minlength: [2,'First name must be at least 2 characters long'],
        },
        lastname: {
            type: String,
            required: true,
            minlength: [2,'Last name must be at least 2 characters long'],
        },
    },
    // email is a string that must be unique and match a valid email format
    // It is required for user identification
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
    },
    // password is a string that must be at least 6 characters long
    // It is required for user authentication and is stored in a hashed format
    password: {
        type: String,
        required: true,
        select: false, // Exclude password from queries by default
        minlength: [6, 'Password must be at least 6 characters long'],
    },
    // socketID is a string that can be used to store the user's socket ID for real-time communication
    // It is optional and can be used for features like notifications or real-time updates
    socketID:{
        type: String,
    }
})

// Pre-save hook to hash the password before saving the user
userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign(
        { _id: this._id },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
    );
    return token;
}
// Compare the provided password with the hashed password in the database
userSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
}
// Hash the password before saving the user
 userSchema.statics.hashPassword = async function(password) {
    return await bcrypt.hash(password, 10);
 }
// Static method to create a new user
// This method is used to create a new user document in the database
const userModel = mongoose.model('User', userSchema);
module.exports = userModel;   