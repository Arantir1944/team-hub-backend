const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const sequelize = require('./database'); // Assuming you have this set up for your Sequelize connection
const userRoutes = require('./routes/UserRoutes'); // Import your user routes here
const { authenticate } = require('./middleware/authenticate'); // If using authentication middleware
const app = express();

// Set up view engine (if you're using views)
app.set('views', path.join(__dirname, 'views')); // Uncomment if using views

// Middleware for parsing data
app.use(express.urlencoded({ extended: true })); // To parse form data
app.use(express.json()); // To parse JSON bodies for API requests

// For handling HTTP methods like PUT, DELETE (needed if using forms)
app.use(methodOverride('_method'));

// Serving static files (e.g., public assets)
app.use(express.static(path.join(__dirname, 'public')));

// Test if Sequelize can connect to the database
sequelize
    .authenticate()
    .then(() => {
        console.log('Connection to the database has been established successfully.');
    })
    .catch((error) => {
        console.error('Unable to connect to the database:', error);
    });

// Use user-related routes
app.use('/api/users', userRoutes); // All user-related routes will start with /api/users

// Simple test route (can be removed once it's not needed)
app.get('/', (req, res) => {
    res.send('Express server is running!');
});

// Start the server
const PORT = 5000; // You can change the port if needed
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
