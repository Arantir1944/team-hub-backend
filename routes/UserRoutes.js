const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const { authenticate } = require('../middleware/authenticate'); // Ensure correct import
const { authorize } = require('../middleware/authorize'); // Correct import of 'authorize'

// Register route
router.post('/register', UserController.registerUser);

// Login route
router.post('/login', UserController.loginUser); // Add the login route


module.exports = router;
