// userSchema and User model
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');  // Optional: For additional validation

// User Schema
const userSchema = new mongoose.Schema({
   name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      maxlength: [100, 'Name cannot exceed 100 characters']
   },
   email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      validate: [validator.isEmail, 'Please enter a valid email']
   },
   password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters long']
   },
   role: {
      type: String,
      enum: ['student', 'admin'],  // Ensure 'student' and 'admin' are used consistently
      default: 'student'
   },
   profilePicture: {
      type: String,
      trim: true
   },
   createdAt: {
      type: Date,
      default: Date.now
   }
});

// Hash password before saving the user
userSchema.pre('save', async function(next) {
   if (!this.isModified('password')) return next();
   
   try {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
      next();
   } catch (error) {
      next(error);
   }
});

// Compare password
userSchema.methods.matchPassword = async function(enteredPassword) {
   return await bcrypt.compare(enteredPassword, this.password);
};

// Create and export the User model
const User = mongoose.model('User', userSchema);
module.exports = User;