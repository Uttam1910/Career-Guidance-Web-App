const express = require('express');
const {
  createTest,
  getAllTests,
  getTestById,
  submitTest,
} = require('../controllers/testController');
const { authenticate, authorizeAdmin } = require('../middleware/authMiddleware');
const router = express.Router();

// Create a new test - Admin only
router.post('/', authenticate, authorizeAdmin, createTest);

// Get all tests
router.get('/', getAllTests);

// Get a single test by ID
router.get('/:id', getTestById);

// Submit test answers and get results
router.post('/submit', authenticate, submitTest);

module.exports = router;
