// app.js
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const bodyParser = require('body-parser');
// const errorHandler = require('./middlewares/errorHandler'); // Error handler middleware

// Import routes
const studentRoutes = require('./routes/studentRoutes');
// Uncomment and include more routes as needed
// const authRoutes = require('./routes/authRoutes');
// const collegeRoutes = require('./routes/collegeRoutes');
// const testRoutes = require('./routes/testRoutes');
// const adminRoutes = require('./routes/adminRoutes');
// const userRoutes = require('./routes/userRoutes');

const app = express();

// Security headers with Helmet
app.use(helmet());

// Enable CORS (Cross-Origin Resource Sharing)
app.use(cors());

// Logging HTTP requests in development mode
app.use(morgan('dev'));

// Body Parser for parsing incoming JSON payloads
app.use(bodyParser.json());
app.use(express.json()); // Parses incoming JSON requests

// Routes
app.use('/api/students', studentRoutes); // Student routes
// Uncomment as needed
// app.use('/api/auth', authRoutes);
// app.use('/api/colleges', collegeRoutes);
// app.use('/api/tests', testRoutes);
// app.use('/api/admin', adminRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'API is running smoothly' });
});

// Global error handler middleware
// app.use(errorHandler);

module.exports = app;
