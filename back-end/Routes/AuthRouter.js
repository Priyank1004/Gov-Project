// Import the validation middleware functions for signup and login from the 'AuthValidation' module
const { signupValidation, loginValidation } = require('../Middlewares/AuthValidation');

// Import the signup and login controller functions from the 'AuthController' module
const { signup, login } = require('../Controllers/AuthController');

// Create a new router object using Express.Router
const router = require('express').Router();

// Define a POST route for the '/login' endpoint
// It uses the 'loginValidation' middleware to validate the request data before calling the 'login' controller
router.post('/login', loginValidation, login);

// Define a POST route for the '/signup' endpoint
// It uses the 'signupValidation' middleware to validate the request data before calling the 'signup' controller
router.post('/signup', signupValidation, signup);

// Export the router object to be used in other parts of the application
module.exports = router;
