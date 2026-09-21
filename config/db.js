const dns = require("node:dns");
dns.setServers(["1.1.1.1", "8.8.8.8"]);

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
