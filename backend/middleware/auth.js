const jwt = require('jsonwebtoken');
const User = require('../models/User');
const secret = process.env.JWT_SECRET || 'replace_with_secret';

module.exports = async (req, res, next) => {
    const auth = req.headers.authorization;
    if (!auth) return res.status(401).json({ message: 'Authorization header missing' });
    const token = auth.split(' ')[1];
    try {
        const payload = jwt.verify(token, secret);
        const user = await User.findById(payload.id).select('-passwordHash');
        if (!user) return res.status(401).json({ message: 'User not found' });
        req.user = user;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Invalid token', error: err.message });
    }
};