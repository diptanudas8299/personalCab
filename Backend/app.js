const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const cors = require('cors');
const connectTodb = require('./db/db');
const userRoutes = require('./routes/user.routes');
const cookieParser = require('cookie-parser');
const  captainRoutes = require('./routes/captain.routes');

connectTodb();
// Middleware setup
// CORS allows your backend to accept requests from different origins
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// Define a simple route for testing
app.get ('/', (req, res) => {
    res.send('Hello from the backend!');
});
// Use the user routes for handling user-related requests
app.use('/users', userRoutes);
app.use('/captains', captainRoutes);

module.exports = app;
