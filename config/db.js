// db.js
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/stockk', {
      // useNewUrlParser: true, // This option is no longer needed but won't cause harm if left
      // useUnifiedTopology: true, // This option is no longer needed but won't cause harm if left
      // useCreateIndex: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
