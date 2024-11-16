// controllers/UserController.js
const bcrypt = require('bcrypt');
const { User } = require('../models/User'); // Adjust the path based on your project structure

// Register User
const registerUser = async (req, res) => {
    try {
        const { firstName, lastName, email, password, role } = req.body;

        // Validate role (only 'user' and 'admin' roles allowed)
        if (!['user', 'admin'].includes(role)) {
            return res.status(400).send('Invalid role');
        }

        // Check if the user already exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) return res.status(400).send('User already exists');

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user with role and hashed password
        const user = await User.create({ firstName, lastName, email, password: hashedPassword, role });

        res.status(201).send(user);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
};

// Other UserController functions can be added here (e.g., login, update, etc.)

module.exports = {
    registerUser,
};
