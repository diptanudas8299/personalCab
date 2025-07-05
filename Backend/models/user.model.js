const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const  jwt = require('jsonwebtoken');


const userSchema = new mongoose.Schema({
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
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
    },
    password: {
        type: String,
        required: true,
        select: false, // Exclude password from queries by default
        minlength: [6, 'Password must be at least 6 characters long'],
    },
    socketID:{
        type: String,
    }
})

// Pre-save hook to hash the password before saving the user
userSchema.methods.generateAuthToken = function() {
    const token  = jwt.sign({_id: this._id}, process.env.JWT_SECRET)
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
const userModel = mongoose.model('User', userSchema);
module.exports = userModel;   