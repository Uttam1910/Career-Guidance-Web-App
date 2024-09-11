// const Test = require('../models/Test');

// // Controller function to create a test
// const createTest = async (req, res) => {
//   const { name, questions } = req.body;

//   try {
//     const test = new Test({
//       name,
//       questions
//     });
//     await test.save();

//     res.status(201).json({ message: 'Test created successfully', test });
//   } catch (error) {
//     res.status(400).json({ message: 'Error creating test', error });
//   }
// };
// // Get all tests
// const getAllTests = async (req, res) => {
//   try {
//     const tests = await Test.find();
//     res.status(200).json(tests);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// // Get a single test by ID
// const getTestById = async (req, res) => {
//   try {
//     const test = await Test.findById(req.params.id);
//     if (!test) {
//       return res.status(404).json({ message: 'Test not found' });
//     }
//     res.status(200).json(test);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// // Submit test answers and get results
// const submitTest = async (req, res) => {
//   const { testId, answers } = req.body;

//   try {
//     const test = await Test.findById(testId);
//     if (!test) {
//       return res.status(404).json({ message: 'Test not found' });
//     }

//     let score = 0;
//     test.questions.forEach((question, index) => {
//       const correctOption = question.options.find(option => option.isCorrect);
//       if (correctOption && answers[index] === correctOption.optionText) {
//         score++;
//       }
//     });

//     res.status(200).json({ score });
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// module.exports = {
//   createTest,
//   getAllTests,
//   getTestById,
//   submitTest,
// };
