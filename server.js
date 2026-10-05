const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const User = require("./models/userModels");
const productRoute = require("./routes/productRoute");
const ApiError = require("./utils/ApiError");
const globalError = require("./middleware/GlobalErrorHandler");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const path = require("path");

dotenv.config();
const app = express();
app.use(express.json());
app.use(express.static(path.join("uploads")));

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

const startServer = async () => {
  try {
    await connectDB();

    // Mount Routes
    app.use("/api/v1/products", productRoute);
    app.use("/api/v1/users", userRoutes);
    app.use("/api/v1/auth", authRoutes);

    app.use((req, res, next) => {
      next(new ApiError("Cannot find this route", 500));
    });

    // Global error handling middleware
    app.use(globalError);

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
