const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const httpErrors = require('http-errors');
const User = require('../models/StudentModel'); // Ensure the correct path to your model

// Generate JWT Token
const generateToken = (id) => {
   return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' }); // Adjust expiration as needed
};

// @desc    Register a new user
// @route   POST /api/users/register
// @access  Public
const registerUser = async (req, res) => {
   const { name, email, password, role } = req.body;

   if (!name || !email || !password || !role) {
      return res.status(400).json({ success: false, message: 'Please provide all required fields' });
   }

   try {
      // Check if user already exists
      const userExists = await User.findOne({ email });
      if (userExists) {
         return res.status(400).json({ success: false, message: 'User already exists' });
      }

      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create new user
      const user = await User.create({
         name,
         email,
         password: hashedPassword,
         role
      });

      // Create and send token
      const token = generateToken(user._id);

      res.status(201).json({
         success: true,
         _id: user._id,
         name: user.name,
         email: user.email,
         role: user.role,
         token
      });
   } catch (error) {
      console.error('Error occurred during registration:', error); // Log the exact error
      res.status(500).json({ success: false, message: 'Server error' });
   }
};

// @desc    Login user
// @route   POST /api/users/login
// @access  Public
// loginUser function
const loginUser = async (req, res, next) => {
   const { email, password } = req.body;

   try {
      // Check if email exists in the database
      const user = await User.findOne({ email });

      // If user doesn't exist or password doesn't match
      if (!user) {
         console.log(`Login failed: User with email ${email} not found`);
         return next(httpErrors(401, 'Invalid email or password')); // Unauthorized
      }

      // Compare the entered password with the hashed password in the database
      const isPasswordMatch = await user.matchPassword(password);

      if (!isPasswordMatch) {
         console.log(`Login failed: Incorrect password for email ${email}`);
         return next(httpErrors(401, 'Invalid email or password')); // Unauthorized
      }

      // If login is successful, generate a token and send response
      const token = generateToken(user._id);

      res.status(200).json({
         success: true,
         _id: user._id,
         name: user.name,
         email: user.email,
         role: user.role,
         token
      });
   } catch (error) {
      // Log the error to the console for debugging
      console.error(`Login error: ${error.message}`);
      next(httpErrors(500, 'Server error'));
   }
};

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private (requires authentication)
const getUserProfile = async (req, res, next) => {
   try {
      const user = await User.findById(req.user.id);

      if (!user) {
         return next(httpErrors(404, 'User not found'));
      }

      res.json({
         _id: user._id,
         name: user.name,
         email: user.email,
         role: user.role,
      });
   } catch (error) {
      next(httpErrors(500, 'Server error'));
   }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private (requires authentication)
const updateUserProfile = async (req, res, next) => {
   const { name, email, password } = req.body;

   try {
      // Find user by ID and update fields
      const user = await User.findById(req.user.id);

      if (!user) {
         return next(httpErrors(404, 'User not found'));
      }

      if (name) user.name = name;
      if (email) user.email = email;
      if (password) user.password = password;

      await user.save();

      res.json({
         _id: user._id,
         name: user.name,
         email: user.email,
         role: user.role,
      });
   } catch (error) {
      next(httpErrors(500, 'Server error'));
   }
};

// @desc    Logout user
// @route   POST /api/users/logout
// @access  Private (requires authentication)
const logoutUser = async (req, res, next) => {
  try {
     // Invalidate the token by client-side logic (e.g., deleting the token)
     res.json({ message: 'Logged out successfully' });
  } catch (error) {
     next(httpErrors(500, 'Server error'));
  }
};

// Export all controller functions
module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  logoutUser,
};
