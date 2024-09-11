const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Student Schema
const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  careerSelection: {
    type: String,
    enum: ['Engineering', 'Management', 'Medical', 'Law', 'Arts', 'Commerce', 'Others'],
    default: 'Engineering',  // default to 'Engineering' but can be selected
  },
  locationPreference: {
    type: String,
    enum: ['India', 'Abroad'],
    default: 'India',  // default to 'India'
  },
  testResult: {
    aptitude: {
      verbal: { type: Number, default: 0 },
      quantitative: { type: Number, default: 0 },
      generalKnowledge: { type: Number, default: 0 },
    },
    totalScore: { type: Number, default: 0 },
    completed: { type: Boolean, default: false },
  },
}, { timestamps: true });

// Hash password before saving the student document
studentSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare passwords
studentSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('Student', studentSchema);
