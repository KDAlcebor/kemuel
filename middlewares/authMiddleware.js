const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {

    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ error: 'Access denied'});
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        //const verified = jwt.veify(token, 'your_jwt_secret');
        req.user = verified;
        next();
    } catch (eer) {
        res.status(400).json({error: 'Invalid token'});
    }
};

module.exports = authenticateToken;