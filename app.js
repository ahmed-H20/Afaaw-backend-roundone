const express = require("express");

const cartItemRoute = require("./routes/cartItemRoute");
const userRouter = require("./routes/userRoute");
const reviewRouter = require("./routes/reviewRoute");
const productRouter = require("./routes/productRoute");
const productItemRouter = require("./routes/productItemRoute");
const orderRouter = require("./routes/orderRoute");
const categoryRouter = require("./routes/categoryRoute");
const cartRouter = require("./routes/cartRoute");
const errorMiddleware = require("./middlewares/error.middleware");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.use("/api/cart", cartRouter);
app.use("/api/cartitem", cartItemRoute);
app.use("/api/user", userRouter);
app.use("/api/review", reviewRouter);
app.use("/api/product", productRouter);
app.use("/api/productitem", productItemRouter);
app.use("/api/order", orderRouter);
app.use("/api/category", categoryRouter);

app.use(errorMiddleware);

module.exports = app;