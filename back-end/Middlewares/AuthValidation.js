// Import the Joi library for schema validation
const Joi = require('joi');

// Middleware function to validate signup requests
const signupValidation = (req, res, next) => {
    // Define a Joi schema for validating signup data
    const schema = Joi.object({
        name: Joi.string().min(3).max(100).required(), // Name must be a string between 3 and 100 characters long
        email: Joi.string().email().required(), // Email must be a valid email address
        password: Joi.string().min(4).max(18).required() // Password must be a string between 4 and 18 characters long
    });

    // Validate the request body against the schema
    const { error } = schema.validate(req.body);
    if (error) {
        // If validation fails, send a 400 Bad Request response with the validation error
        return res.status(400)
            .json({ message: "Bad Request", error })
    }
    // If validation succeeds, proceed to the next middleware or route handler
    next();
}

// Middleware function to validate login requests
const loginValidation = (req, res, next) => {
    // Define a Joi schema for validating login data
    const schema = Joi.object({
        email: Joi.string().email().required(), // Email must be a valid email address
        password: Joi.string().min(4).max(18).required() // Password must be a string between 4 and 18 characters long
    });

    // Validate the request body against the schema
    const { error } = schema.validate(req.body);
    if (error) {
        // If validation fails, send a 400 Bad Request response with the validation error
        return res.status(400)
            .json({ message: "Bad Request", error })
    }
    // If validation succeeds, proceed to the next middleware or route handler
    next();
}

// Export the validation middleware functions for use in other parts of the application
module.exports = {
    signupValidation,
    loginValidation
}
