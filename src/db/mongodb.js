require('dotenv').config({path: '.env.local'});
const mongoose = require('mongoose');

const dbPassword = process.env.MONGO_DB_PASSWORD;
const uri = `mongodb+srv://joacoalonsogarcia:${dbPassword}@idukaytest.zxbsutr.mongodb.net/idukay?retryWrites=true&w=majority&appName=IdukayTest`;

const connectDB = async function () {
  try {
    await mongoose.connect(uri);
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

module.exports = connectDB;
