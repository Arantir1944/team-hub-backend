// middleware/authorize.js
const authorize = (roles) => {
    return (req, res, next) => {
        // Check if the user's role is in the list of allowed roles
        if (!roles.includes(req.user.role)) {
            return res.status(403).send('Permission denied');
        }
        next();
    };
};

module.exports = { authorize }; // Correct export
