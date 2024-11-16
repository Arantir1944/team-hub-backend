// middleware/authenticate.js
const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach user info (userId, role) to the request object
        next();
    } catch (error) {
        res.status(401).send('Not authorized');
    }
};

module.exports = { authenticate };
