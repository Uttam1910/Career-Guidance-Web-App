const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/authMiddleware');
const {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  logoutUser
} = require('../controllers/studentController');

// Public Routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Private Routes
router.get('/profile', protect, getUserProfile);
router.put('/profile', protect, updateUserProfile);
router.post('/logout', protect, logoutUser);

module.exports = router;
