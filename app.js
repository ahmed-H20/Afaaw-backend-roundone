const express = require("express");
const productRoute = require("./routes/productRoute");
const reviewRoutes = require("./routes/reviewRoutes");
const userRoute = require("./routes/userRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const { notFound, errorHandler } = require("./middlewares/errorHandeler");
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.use("/api/v1/products", productRoute);
app.use("/api/v1/reviews", reviewRoutes);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/carts", cartRoutes);
app.use("/api/v1/orders", orderRoutes);
app.use("/api/v1/categories", categoryRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
