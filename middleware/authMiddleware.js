const jwt = require('jsonwebtoken');
const httpErrors = require('http-errors');
const User = require('../models/StudentModel');

// Middleware to protect routes
const protect = async (req, res, next) => {
   let token;

   if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      try {
         // Get token from header
         token = req.headers.authorization.split(' ')[1];

         // Verify token
         const decoded = jwt.verify(token, process.env.JWT_SECRET);

         // Get user from the token
         req.user = await User.findById(decoded.id).select('-password');

         next();
      } catch (error) {
         next(httpErrors(401, 'Not authorized, token failed'));
      }
   }

   if (!token) {
      next(httpErrors(401, 'Not authorized, no token'));
   }
};

// Middleware to check if the user is an admin
const admin = (req, res, next) => {
   if (req.user && req.user.role === 'admin') {
      next();
   } else {
      next(httpErrors(403, 'Not authorized as an admin'));
   }
};

module.exports = { protect, admin };
