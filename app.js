const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const { errorHandler } = require('./middleware/errorHandler');
const studentRoutes = require('./routes/studentRoutes');

// Import routes
// const authRoutes = require('./routes/authRoutes');
const collegeRoutes = require('./routes/collegeRoutes');
const testRoutes = require('./routes/testRoutes');

// const adminRoutes = require('./routes/adminRoutes');
// const userRoutes = require('./routes/userRoutes');

// Use admin and user routes



const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(express.json());

// Routes
// app.use('/api/auth', authRoutes);
app.use('/api/colleges', collegeRoutes);
app.use('/api/tests', testRoutes);
app.use('/api/students', studentRoutes);

// Error handler middleware
app.use(errorHandler);

module.exports = app;
