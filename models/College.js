// models/College.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const collegeSchema = new Schema({
  name: {
    type: String,
    required: [true, 'College name is required'],
    unique: true,
    trim: true,
    minlength: [3, 'College name must be at least 3 characters long'],
    maxlength: [150, 'College name cannot exceed 150 characters'],
  },
  tuitionFee: {
    type: Number,
    required: [true, 'Tuition fee is required'],
    min: [0, 'Tuition fee cannot be less than 0'],
  },
  location: {
    city: {
      type: String,
      required: [true, 'City is required'],
      trim: true,
    },
    state: {
      type: String,
      required: [true, 'State is required'],
      trim: true,
    },
    country: {
      type: String,
      required: [true, 'Country is required'],
      trim: true,
    },
  },
  eligibilityCGPA: {
    type: Number,
    required: [true, 'Eligibility CGPA is required'],
    min: [0, 'Eligibility CGPA cannot be less than 0'],
    max: [10, 'Eligibility CGPA cannot be more than 10'],
  },
  entranceExamScoreRequired: {
    type: Number,
    required: [true, 'Entrance exam score requirement is required'],
    min: [0, 'Score cannot be less than 0'],
    max: [100, 'Score cannot be more than 100'],
  },
  coursesOffered: {
    type: [String], // Array of course names like ['Engineering', 'Management']
    required: [true, 'Courses offered are required'],
  },
  ranking: {
    type: Number,
    min: [0, 'Ranking cannot be less than 0'],
    required: [true, 'College ranking is required'],
  },
  scholarshipAvailable: {
    type: Boolean,
    default: false, // Defaults to no scholarships unless specified
  },
  housingAvailable: {
    type: Boolean,
    default: false, // Defaults to no housing unless specified
  },
  campusFacilities: {
    type: [String], // Example: ['Library', 'Sports Complex', 'Wi-Fi']
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now, // Automatically set the creation date
  },
});

module.exports = mongoose.model('College', collegeSchema);
