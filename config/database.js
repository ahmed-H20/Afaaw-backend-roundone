import mongoose from "mongoose";

const connectDB = async () => {
  await mongoose.connect(process.env.MONGODB_URL);
  console.info("MongoDB connected ✅");
};

export default connectDB;
