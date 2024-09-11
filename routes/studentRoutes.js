const express = require('express');
const router = express.Router();
const { 
  registerStudent, 
  loginStudent, 
  getStudentProfile, 
  updateCareerSelection, 
  updateLocationPreference,
  submitAptitudeTestResults
} = require('../controllers/studentController');
const { protect } = require('../middleware/authMiddleware');

// Student registration and login
router.post('/register', registerStudent);
router.post('/login', loginStudent);

// Profile (protected)
router.get('/profile', protect, getStudentProfile);

// Career selection (protected)
router.put('/career-selection', protect, updateCareerSelection);

// Location preference (protected)
router.put('/location-preference', protect, updateLocationPreference);

// Submit aptitude test results (protected)
router.post('/submit-test', protect, submitAptitudeTestResults);

module.exports = router;
