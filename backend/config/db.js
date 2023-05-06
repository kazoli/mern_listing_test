const mongoose = require('mongoose');
const clc = require('cli-color');

const connectDB = async () => {
  try {
    const db = await mongoose.connect(process.env.MONGO_URI, {
      maxPoolSize: 10, // Maintain up to 10 socket connections
      serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
      family: 4, // Use IPv4, skip trying IPv6
    });
    console.log(clc.cyan.underline(`MongoDB Connected: ${db.connection.host}`));
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

module.exports = connectDB;
