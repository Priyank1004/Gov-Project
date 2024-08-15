// Load environment variables from a .env file into process.env
require('dotenv').config();

// Import the database connection module
require('./Models/db');

// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRouter = require('./Routes/AuthRouter');
const productRouter = require('./Routes/ProductRouter');

// Create an instance of the Express application
const app = express();

// Set the port to the value in the environment variable PORT or default to 5000
const PORT = process.env.PORT;

// Middleware to parse incoming JSON requests
app.use(bodyParser.json());

// Middleware to enable Cross-Origin Resource Sharing (CORS)
app.use(cors());

// Set up routing for authentication-related endpoints
app.use('/auth', authRouter);
app.use('/products', productRouter);

// Start the server and listen on the specified port
app.listen(PORT, () =>{
    console.log(`Server is running on ${PORT}`); // Log a message to indicate the server is running
});
