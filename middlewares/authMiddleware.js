// middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
  const authHeader = req.header('Authorization');
  
  // Check if Authorization header is present and follows 'Bearer <token>' format
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  // Extract the token by removing 'Bearer ' from the header
  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.student = decoded; // Attach student ID to request object
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

// Middleware to check if user is admin
exports.adminCheck = (req, res, next) => {
  if (!req.admin) {
    return res.status(403).json({ message: 'Admin privileges required' });
  }
  next();
};
