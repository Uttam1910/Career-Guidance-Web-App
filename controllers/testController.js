const TestResult = require('../models/TestResult');

// Provide test questions (mock data for simplicity)
exports.takeTest = async (req, res) => {
  try {
    // Example questions
    const questions = [
      { id: 1, type: 'verbal', question: 'What is the synonym of "happy"?' },
      { id: 2, type: 'quantitative', question: 'What is 7 + 8?' },
      { id: 3, type: 'general', question: 'Which planet is known as the Red Planet?' }
    ];

    res.json({ questions });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Submit test results
exports.submitTest = async (req, res) => {
  const { answers } = req.body; // Answers should be in the form [{questionId, answer}]

  try {
    // Here we would process and score the test
    // For simplicity, we'll assume the scoring logic is done here

    // Save test result to database
    const testResult = new TestResult({
      student: req.user.id,
      answers,
      score: calculateScore(answers) // Implement your scoring logic here
    });

    await testResult.save();
    res.status(201).json({ message: 'Test submitted successfully', testResult });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Example scoring function (replace with actual logic)
const calculateScore = (answers) => {
  return answers.reduce((score, answer) => {
    // Mock scoring: 1 point per answer
    return score + 1;
  }, 0);
};
