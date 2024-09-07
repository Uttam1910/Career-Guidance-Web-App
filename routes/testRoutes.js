const express = require('express');
const { takeTest, submitTest } = require('../controllers/testController');
const router = express.Router();
const auth = require('../middleware/auth'); // Auth middleware to protect routes

// Take the aptitude test (open to all)
router.get('/take', takeTest);

// Submit the test results (protected route)
router.post('/submit', auth, submitTest);

module.exports = router;
