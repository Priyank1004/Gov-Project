// Import the mongoose library, which provides a schema-based solution to model your application data.
const mongoose = require('mongoose');

// Destructure the Schema constructor from mongoose to define our data structure.
const Schema = mongoose.Schema;

// Define a new schema for the 'User' model. This schema specifies the structure and constraints for user documents.
const UserSchema = new Schema({
    // The 'name' field is a required string. This will hold the user's name.
    name: {
        type: String,
        required: true
    },
    // The 'email' field is a required string and must be unique across the collection.
    // This will hold the user's email address.
    email: {
        type: String,
        required: true,
        unique: true
    },
    // The 'password' field is a required string. This will hold the user's password.
    password: {
        type: String,
        required: true
    }
});

// Create a model named 'users' based on the UserSchema. This model will be used to interact with the 'users' collection in MongoDB.
const Usermodel = mongoose.model('users', UserSchema);

// Export the Usermodel to make it available in other files. Note: there is a typo in `module. Exports`, it should be `module.exports`.
module.exports = Usermodel;
