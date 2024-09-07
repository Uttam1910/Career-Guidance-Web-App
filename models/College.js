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
  tuition: {
    type: Number,
    required: true,
  },
  housing: {
    type: Boolean,
    default: false,
  },
  // Other fields like placements, rankings, etc.
});

module.exports = mongoose.model('College', collegeSchema);
