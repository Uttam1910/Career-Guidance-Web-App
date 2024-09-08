const express = require('express');
const {
  createTest,
  getAllTests,
  getTestById,
  submitTest,
} = require('../controllers/testController');
const router = express.Router();

// Create a new test
router.post('/', createTest);

// Get all tests
router.get('/', getAllTests);

// Get a single test by ID
router.get('/:id', getTestById);

// Submit test answers and get results
router.post('/submit', submitTest);

module.exports = router;
