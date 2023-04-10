const mongoose = require("mongoose");

// Realistically we want to put this in a .env file for "security", but not a major concern right now - L
const mongoDBUri = "mongodb+srv://leobujcar:mongodb@cluster0.n4odbm8.mongodb.net/?retryWrites=true&w=majority";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(mongoDBUri, {
      useUnifiedTopology: true,
      useNewUrlParser: true,

    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit();
  }
};

module.exports = connectDB;
 