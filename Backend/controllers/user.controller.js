const  userModel = require('../models/user.model');
const userService = require('../services/user.service');
const { validationResult } = require('express-validator');
const blacklistTokenModel = require('../models/blacklistToken.model');

// This function handles user registration
// It validates the input, hashes the password, creates a new user, and returns a token

module.exports.registerUser = async (req, res,next) => {
   // Validate the request body using express-validator
    // If there are validation errors, return a 400 status with the error messages
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    } 
    // Extract the fullname, email, and password from the request body
    // Hash the password using the hashPassword method from the userModel  
    const { fullname, email, password } = req.body;
    // Check if all required fields are provided
    // If any field is missing, return a 400 status with an error message
    if (!fullname || !email || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    }  
    const isUserAlreadyExist = await userModel.findOne({ email });
    if (isUserAlreadyExist) {
        return res.status(400).json({ error: 'User already exists' });
    }
    
    // Check if the email is already registered
    // If the email already exists, return a 400 status with an error message
    const  hashedPassword = await userModel.hashPassword(password);
    const user = await userService.createUser({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassword
    });
    // Generate an authentication token for the user
    // The token is generated using the generateAuthToken method from the userModel
    const token = user.generateAuthToken();
    res.status(201).json({token, user});

   
};
module.exports.loginUser = async (req, res, next) => {
    // Validate the request body using express-validator
    // If there are validation errors, return a 400 status with the error messages
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    // Extract the email and password from the request body
    const { email, password } = req.body;
    // Check if all required fields are provided
   // const user = await userModel.findOne({ email }.select('+password'));
   const user = await userModel.findOne({ email }).select('+password');
 
   if (!user) {
        return res.status(401).json({ error: 'Invalid email or password' });
    }
    // Verify the password using the verifyPassword method from the userModel
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Generate an authentication token for the user
    const token = user.generateAuthToken();
    res.cookie('token', token);
    res.status(200).json({token,user});

}

module.exports.getUserProfile = async (req,res,next)=>{
   res.status(200).json(req.user);
}

module.exports.logoutUser = async (req, res, next) => {
    res.clearCookie('token'); // Clear the cookie containing the token
    const token = req.cookies.token || req.headers.authorization.split(' ')[1];
    await blacklistTokenModel.create({ token }); // Add the token to the blacklist
    // Optionally, you can also remove the socketID from the user if needed
    // await userModel.findByIdAndUpdate(req.user._id, { socketID: null });
    // Respond with a success message
    res.status(200).json({ message: 'Logged out successfully' });
}