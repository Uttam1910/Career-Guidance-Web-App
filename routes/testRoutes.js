// const express = require('express');
// const { getAllTests, getTestById, submitTest, createTest } = require('../controllers/testController');
// const { protect, adminOnly } = require('../middleware/authMiddleware'); // Check if these exist

// const router = express.Router();

// // Route to create a test (admin only)
// router.post('/', protect, adminOnly, createTest); // Protect and Admin-only access

// // Get all tests
// router.get('/', getAllTests);

// // Get a single test by ID
// router.get('/:id', getTestById);

// // Submit test answers and get results
// router.post('/submit', protect, submitTest); // Assuming `protect` is the user authentication

// module.exports = router;
