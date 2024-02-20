const jwt = require('jsonwebtoken');

//Middleware function to handle jwt authorization
const requireAuth = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({
                status: 'FAILED',
                message: 'Please login to continue.'
            })
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        if (!decodedToken) return res.status(401).json({ message: "Invalid token" });
        req.body.userId = decodedToken.userId;
        next();
    }
    catch (error) {
        return res.status(401).json({
            status: 'FAILED',
            message: 'Unauthorized' + error.message
        })
    }
}

module.exports = requireAuth;