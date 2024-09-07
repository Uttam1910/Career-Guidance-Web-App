const app = require('./app');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();
const connectDB = require('./config/db');

// Connect to MongoDB
connectDB();


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
