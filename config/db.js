const mongoose = require("mongoose");

const connectDB = () => {
  try {
    mongoose.connect(process.env.MONGODB_URL).then(() => {
      console.log("MongoDB connected ✅");
    });
  } catch (error) {
    console.error("MongoDB connection failed ❌", error);
    process.exit(1);
  }
};

module.exports = connectDB;
