// server.js
const app = require('./app'); // Import the configured Express app
const dotenv = require('dotenv'); // Environment variables manager
const connectDB = require('./config/db'); // Database connection

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB
connectDB();

// Define the port from environment variables or default to 5000
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Graceful shutdown handling for the server
process.on('SIGTERM', () => {
  console.log('SIGTERM received: Shutting down gracefully...');
  server.close(() => {
    console.log('Server terminated');
    process.exit(0);
  });
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err.message);
  server.close(() => {
    process.exit(1);
  });
});

process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err.message);
  server.close(() => {
    process.exit(1);
  });
});
