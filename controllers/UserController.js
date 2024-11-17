const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');  // Correct import from models folder

// Register a new user
const registerUser = async (req, res) => {
    try {
        const { firstName, lastName, email, password, role } = req.body;

        // Validate role (it can only be 'user' or 'admin')
        if (!['user', 'admin'].includes(role)) {
            return res.status(400).json({ message: 'Invalid role' });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create new user with role and hashed password
        const newUser = await User.create({ firstName, lastName, email, password, role });

        // Return user data excluding sensitive information like password
        return res.status(201).json({
            id: newUser.id,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            email: newUser.email,
            role: newUser.role,
        });
    } catch (error) {
        console.error("Error during registration:", error);  // Log the error details
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find the user by email
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Compare the provided password with the stored hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate a JWT token
        const token = jwt.sign(
            { userId: user.id, email: user.email, role: user.role },
            process.env.JWT_SECRET, // Make sure to set your secret key in your environment variables
            { expiresIn: '1h' } // Set token expiration time
        );

        // Send response with token
        return res.status(200).json({
            message: 'Login successful',
            token: token,
            user: {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: user.role,
            },
        });
    } catch (error) {
        console.error("Error during login:", error);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = {
    registerUser,
    loginUser,  // Export the login function
};
