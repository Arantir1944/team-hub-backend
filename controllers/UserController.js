// src/controllers/UserController.js

const { User } = require('../models/User');  // Assuming your model is correctly set up

// Register a new user
const registerUser = async (req, res) => {
    try {
        const { firstName, lastName, email, password, role } = req.body;

        // Validate role (it can only be 'user' or 'admin')
        if (!['user', 'admin'].includes(role)) {
            return res.status(400).send('Invalid role');
        }

        // Check if user already exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).send('User already exists');
        }

        // Create new user with role
        const user = await User.create({ firstName, lastName, email, password, role });
        return res.status(201).send(user);
    } catch (error) {
        console.error("Error during registration:", error);  // Log the error details
        return res.status(500).send('Server error');
    }
};

module.exports = {
    registerUser,
};
