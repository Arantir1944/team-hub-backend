const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const sequelize = require('./database');
const app = express();


// app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));


sequelize
    .authenticate()
    .then(() => {
        console.log('Connection to the database has been established successfully.');
    })
    .catch((error) => {
        console.error('Unable to connect to the database:', error);
    });


// Simple test route
app.get('/', (req, res) => {
    res.send('Express server is running!');
});

// Start the server
const PORT = 5000; // You can change the port if needed
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
