const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const User = require("./models/userModels");

dotenv.config();
const app = express();

// connect to database
connectDB();

// test route
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
