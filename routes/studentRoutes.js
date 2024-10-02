// routes/studentRoutes.js
const express = require('express');
const { registerStudent, loginStudent, getStudentProfile, updateStudentProfile } = require('../controllers/studentController');
const { verifyToken } = require('../middlewares/authMiddleware');
const router = express.Router();

// Public Routes
router.post('/register', registerStudent);
router.post('/login', loginStudent);

// Protected Routes
router.get('/profile', verifyToken, getStudentProfile);
router.put('/profile', verifyToken, updateStudentProfile);

module.exports = router;
