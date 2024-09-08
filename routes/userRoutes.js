// routes/userRoutes.js
const express = require('express');
const { auth } = require('../middleware/authMiddleware');
const TestResult = require('../models/TestResult');

const router = express.Router();

// User submits test answers and gets score
router.post('/test/submit', auth, async (req, res) => {
  const { answers } = req.body;

  if (!answers || answers.length === 0) {
    return res.status(400).json({ message: 'Answers are required' });
  }

  try {
    // Calculate score (dummy logic for demonstration, adjust this based on your real questions)
    let score = 0;
    answers.forEach((answer) => {
      if (answer.answer === 'correctAnswer') { // Replace with real comparison logic
        score += 1;
      }
    });

    // Save test result
    const testResult = new TestResult({
      student: req.user._id,
      answers,
      score,
    });
    await testResult.save();

    res.status(201).json({ message: 'Test submitted successfully', score });
  } catch (err) {
    res.status(500).json({ message: 'Error submitting test' });
  }
});

module.exports = router;
