const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const User = require("./models/userModels");
const productRoute = require("./routes/productRoute");

dotenv.config();
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

const startServer = async () => {
  try {
    await connectDB();

    app.use("/api/v1/products", productRoute);

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
