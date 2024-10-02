// controllers/studentController.js
const Student = require('../models/StudentModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register a new student
exports.registerStudent = async (req, res) => {
  const { name, email, password, phoneNumber, CGPA, entranceExamScore, dateOfBirth, address, coursePreferences } = req.body;

  try {
    // Check if student already exists
    let student = await Student.findOne({ email });
    if (student) {
      return res.status(400).json({ message: 'Student already registered' });
    }

    // Hash the password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new student
    student = new Student({
      name,
      email,
      password: hashedPassword,
      phoneNumber,
      CGPA,
      entranceExamScore,
      dateOfBirth,
      address,
      coursePreferences,
    });

    await student.save();

    // Generate a JWT for authentication
    const token = jwt.sign({ id: student.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ message: 'Student registered successfully', token });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Student login
exports.loginStudent = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if student exists
    const student = await Student.findOne({ email });
    if (!student) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Generate a JWT
    const token = jwt.sign({ id: student.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ message: 'Login successful', token });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Get student profile
exports.getStudentProfile = async (req, res) => {
  try {
    const student = await Student.findById(req.student.id).select('-password');
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.status(200).json(student);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Update student profile
exports.updateStudentProfile = async (req, res) => {
  const { name, phoneNumber, CGPA, entranceExamScore, address, coursePreferences } = req.body;

  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      req.student.id,
      { name, phoneNumber, CGPA, entranceExamScore, address, coursePreferences },
      { new: true, runValidators: true }
    ).select('-password');

    if (!updatedStudent) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.status(200).json(updatedStudent);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
