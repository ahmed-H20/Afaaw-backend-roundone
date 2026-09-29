const express = require("express");
const cookieParser = require("cookie-parser");

const authRouter = require("./routes/authRoute");
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
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.use("/api/auth", authRouter);

app.use("/api/cart", cartRouter);
app.use("/api/carts", cartRouter);

app.use("/api/cartitem", cartItemRoute);
app.use("/api/cartitems", cartItemRoute);
app.use("/api/cart-items", cartItemRoute);

app.use("/api/user", userRouter);
app.use("/api/users", userRouter);

app.use("/api/review", reviewRouter);
app.use("/api/reviews", reviewRouter);

app.use("/api/product", productRouter);
app.use("/api/products", productRouter);

app.use("/api/productitem", productItemRouter);
app.use("/api/productitems", productItemRouter);
app.use("/api/product-items", productItemRouter);

app.use("/api/order", orderRouter);
app.use("/api/orders", orderRouter);

app.use("/api/category", categoryRouter);
app.use("/api/categories", categoryRouter);

app.use(errorMiddleware);

module.exports = app;