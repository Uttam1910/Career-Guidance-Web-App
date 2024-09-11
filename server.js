const app = require('./app');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
// const http = require('http');
// const server = http.createServer(app);
// Load environment variables
dotenv.config();

// Connect to the database
connectDB();

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
