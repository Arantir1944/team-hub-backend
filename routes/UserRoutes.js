// routes/UserRoutes.js
const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const { authenticate } = require('../middleware/authenticate'); // Ensure correct import
const { authorize } = require('../middleware/authorize'); // Correct import of 'authorize'

// Register route (only accessible by admin)
router.post('/register', authenticate, authorize(['admin']), UserController.registerUser);

module.exports = router;
