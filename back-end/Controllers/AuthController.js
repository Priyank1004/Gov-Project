const Usermodel = require("../Models/User"); // Import the User model
const bcrypt = require('bcrypt'); // Import bcrypt for password hashing
const jwt = require('jsonwebtoken'); // Import jsonwebtoken for creating JWT tokens

// Function to handle user signup
const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body; // Destructure user data from the request body

        // Check if a user with the provided email already exists
        const user = await Usermodel.findOne({ email });
        if (user) {
            return res.status(409).json({
                message: "User is already exist, you can login",
                success: false
            });
        }

        // Create a new user object
        const userModel = new Usermodel({ name, email, password });

        // Hash the password before saving the user
        userModel.password = await bcrypt.hash(password, 10);
        await userModel.save(); // Save the new user to the database

        // Respond with a success message
        res.status(201).json({
            message: "Signup successfully",
            success: true
        });
    } catch (err) {
        // Handle any errors that occur during the signup process
        res.status(500).json({
            message: "Internal server Error",
            success: false
        });
    }
}

// Function to handle user login
const login = async (req, res) => {
    try {
        const { email, password } = req.body; // Destructure user data from the request body

        // Find the user by email
        const user = await Usermodel.findOne({ email });
        const errorMsg = "Auth failed email or password is wrong"; // Error message for failed authentication

        if (!user) {
            // If no user is found with the provided email, respond with an error
            return res.status(403).json({
                message: errorMsg,
                success: false
            });
        }

        // Compare the provided password with the stored hashed password
        const isPassEqual = await bcrypt.compare(password, user.password);
        if (!isPassEqual) {
            // If passwords do not match, respond with an error
            return res.status(403).json({
                message: errorMsg,
                success: false
            });
        }

        // Create a JWT token for the authenticated user
        const jwtToken = jwt.sign(
            { email: user.email, _id: user._id },
            process.env.JWT_SECRET, // Secret key for signing the JWT
            { expiresIn: '24h' } // Token expiration time
        );

        // Respond with success message and JWT token
        res.status(200).json({
            message: "Login successfully",
            success: true,
            jwtToken,
            email,
            name: user.name
        });
    } catch (err) {
        // Handle any errors that occur during the login process
        res.status(500).json({
            message: "Internal server Error",
            success: false
        });
    }
}

module.exports = {
    signup,
    login
};
