// models/Student.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const studentSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Student name is required'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters long'],
    maxlength: [100, 'Name cannot exceed 100 characters'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true, // Ensure that each email is unique
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Please provide a valid email address',
    ],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters long'],
  },
  phoneNumber: {
    type: String,
    match: [
      /^\d{10}$/,
      'Phone number must be exactly 10 digits',
    ],
    required: [true, 'Phone number is required'],
  },
  CGPA: {
    type: Number,
    required: [true, 'CGPA is required'],
    min: [0, 'CGPA cannot be less than 0'],
    max: [10, 'CGPA cannot be more than 10'],
  },
  entranceExamScore: {
    type: Number,
    required: [true, 'Entrance exam score is required'],
    min: [0, 'Score cannot be less than 0'],
    max: [100, 'Score cannot be more than 100'],
  },
  dateOfBirth: {
    type: Date,
    required: [true, 'Date of birth is required'],
    validate: {
      validator: function (value) {
        return value <= new Date();
      },
      message: 'Date of birth cannot be in the future',
    },
  },
  address: {
    street: {
      type: String,
      required: [true, 'Street address is required'],
    },
    city: {
      type: String,
      required: [true, 'City is required'],
    },
    state: {
      type: String,
      required: [true, 'State is required'],
    },
    country: {
      type: String,
      required: [true, 'Country is required'],
    },
    postalCode: {
      type: String,
      required: [true, 'Postal code is required'],
      match: [/^\d{5}(-\d{4})?$/, 'Invalid postal code format'],
    },
  },
  coursePreferences: {
    type: [String], // List of preferred courses (e.g., 'Engineering', 'Management')
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now, // Automatically set the created date
  },
});

module.exports = mongoose.model('Student', studentSchema);
