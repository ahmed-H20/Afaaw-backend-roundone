const mongoose = require("mongoose");

// Returns a promise so the caller can wait for the connection. If it fails,
// the error is thrown to the caller (server.js), which logs it and exits.
const connectDB = async () => {
  if (!process.env.MONGODB_URL) {
    throw new Error("MONGODB_URL is not set. Add it to .env first.");
  }

  await mongoose.connect(process.env.MONGODB_URL);
  console.log("MongoDB connected ✅");
};

module.exports = connectDB;
