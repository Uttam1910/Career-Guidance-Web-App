const Student = require('../models/StudentModel');

const jwt = require('jsonwebtoken');

// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });
};

// Student Registration
exports.registerStudent = async (req, res) => {
  const { name, email, password, phone } = req.body;

  try {
    const studentExists = await Student.findOne({ email });
    if (studentExists) {
      return res.status(400).json({ message: 'Student already exists' });
    }

    const student = await Student.create({
      name,
      email,
      password,
      phone,
    });

    const token = generateToken(student._id);

    res.status(201).json({
      message: 'Student registered successfully',
      token,
      student: {
        id: student._id,
        name: student.name,
        email: student.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Student Login
exports.loginStudent = async (req, res) => {
  const { email, password } = req.body;

  try {
    const student = await Student.findOne({ email });

    if (!student || !(await student.matchPassword(password))) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = generateToken(student._id);

    res.status(200).json({
      message: 'Login successful',
      token,
      student: {
        id: student._id,
        name: student.name,
        email: student.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get student profile (for after login)
exports.getStudentProfile = async (req, res) => {
  try {
    const student = await Student.findById(req.user.id).select('-password');
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.status(200).json(student);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update career selection
exports.updateCareerSelection = async (req, res) => {
  const { careerSelection } = req.body;

  try {
    const student = await Student.findById(req.user.id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    student.careerSelection = careerSelection;
    await student.save();

    res.status(200).json({ message: 'Career selection updated successfully', careerSelection });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update location preference
exports.updateLocationPreference = async (req, res) => {
  const { locationPreference } = req.body;

  try {
    const student = await Student.findById(req.user.id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    student.locationPreference = locationPreference;
    await student.save();

    res.status(200).json({ message: 'Location preference updated successfully', locationPreference });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Submit Aptitude Test Results
exports.submitAptitudeTestResults = async (req, res) => {
  const { verbal, quantitative, generalKnowledge } = req.body;

  try {
    const student = await Student.findById(req.user.id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    const totalScore = verbal + quantitative + generalKnowledge;

    student.testResult = {
      aptitude: {
        verbal,
        quantitative,
        generalKnowledge,
      },
      totalScore,
      completed: true,
    };

    await student.save();

    res.status(200).json({
      message: 'Test results submitted successfully',
      testResult: student.testResult,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
