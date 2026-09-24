const express = require("express");

const productRoute = require("./routes/product.route");
const categoryRoute = require("./routes/category.route");
const userRoute = require("./routes/user.route");
const cartRoute = require("./routes/cart.route");
const orderRoute = require("./routes/order.route");
const reviewRoute = require("./routes/review.route");
const authRoute = require("./routes/auth.route");

const notFound = require("./middleware/not-found.middleware");
const errorHandler = require("./middleware/error.middleware");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello, World!");
});

app.use("/api/auth", authRoute);
app.use("/api/products", productRoute);
app.use("/api/categories", categoryRoute);
app.use("/api/users", userRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/reviews", reviewRoute);

// 404
app.use(notFound);

// Global Error Handler
app.use(errorHandler);

module.exports = app;