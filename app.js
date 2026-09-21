const express = require("express");

const productRoute = require("./routes/product.route");
const categoryRoute = require("./routes/category.route");
const userRoute = require("./routes/user.route");
const cartRoute = require("./routes/cart.route");
const orderRoute = require("./routes/order.route");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello, World!");
});

app.use("/api/products", productRoute);
app.use("/api/categories", categoryRoute);
app.use("/api/users", userRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);

module.exports = app;