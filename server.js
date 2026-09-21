const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const User = require("./models/userModels");
const productRoute = require("./routes/productRoute");
const reviewRoute = require("./routes/reviewRoute");
const categoryRoute = require("./routes/categoryRoute");
const userRoute = require("./routes/userRoute");
const cartRoute = require("./routes/cartRoute");
const cartItemRoute = require("./routes/cartItemRoute");
const orderRoute = require("./routes/orderRoute");
const orderItemRoute = require("./routes/orderItemRoute");

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
    app.use("/api/v1/reviews", reviewRoute);
    app.use("/api/v1/categories", categoryRoute);
    app.use("/api/v1/users", userRoute);
    app.use("/api/v1/carts", cartRoute);
    app.use("/api/v1/cart-items", cartItemRoute);
    app.use("/api/v1/orders", orderRoute);
    app.use("/api/v1/order-items", orderItemRoute);

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
