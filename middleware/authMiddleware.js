// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const requireAuth = (roles = []) => {
  return async (req, res, next) => {
    try {
      const token = req.header('Authorization').replace('Bearer ', '');
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id);

      if (!user || (roles.length && !roles.includes(user.role))) {
        return res.status(403).json({ message: 'Access denied' });
      }

      req.user = user;
      next();
    } catch (error) {
      res.status(401).json({ message: 'Authentication failed' });
    }
  };
};

module.exports = requireAuth;
