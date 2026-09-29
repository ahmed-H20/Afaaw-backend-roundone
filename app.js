const express = require("express");
const productRoute = require("./routes/productRoute");
const userRoute = require("./routes/userRoutes");
const cartRoute = require("./routes/cartRoutes");
const { default: errorHandler } = require("./middlewares/errorHandler");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello, World!");
});

app.use("/api/products", productRoute);
app.use("/api/users", userRoute);
app.use("/api/cart", cartRoute);
app.use("/api/category", cartRoute);
app.use(errorHandler)

module.exports = app;