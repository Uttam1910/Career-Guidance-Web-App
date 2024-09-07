const mongoose = require('mongoose');

const collegeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  eligibility: {
    type: String,
    required: true,
  },
  fees: {
    type: Number,
    required: true,
  },
  // Additional fields such as courses, placement details, etc.
}, { timestamps: true });

const College = mongoose.model('College', collegeSchema);
module.exports = College;
