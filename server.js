const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const connectDB = require("./config/db");
const productRoute = require("./routes/productRoute");
const userRoute = require("./routes/userRoute");
const reviewRoute = require('./routes/reviewRoute')
const categoryRoute = require('./routes/categoryRout')
const productItemRoute = require('./routes/productItemRoute')
const cartRoute = require('./routes/cartRoute')
const cartItemRoute = require('./routes/cartItemRoute')
const orederRoute = require('./routes/orderRoute')

app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.use("/api/v1/products", productRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/reviews" , reviewRoute)
app.use("/api/v1/categories" , categoryRoute)
app.use("/api/v1/productItems" , productItemRoute)
app.use("/api/v1/carts" , cartRoute)
app.use("/api/v1/cartItems" , cartItemRoute)
app.use("/api/v1/orders" , orederRoute)

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
