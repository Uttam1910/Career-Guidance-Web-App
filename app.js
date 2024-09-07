const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const { errorHandler } = require('./middleware/errorHandler');

// Import routes
const authRoutes = require('./routes/authRoutes');
const collegeRoutes = require('./routes/collegeRoutes');

// Initialize app
const app = express();

// Middleware
app.use(helmet()); // Security
app.use(cors());   // Enable CORS
app.use(morgan('dev')); // Logger
app.use(bodyParser.json()); // Parse incoming requests

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/colleges', collegeRoutes);

// Error handler middleware
app.use(errorHandler);

module.exports = app;
