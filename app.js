const express = require("express");
const productRoute = require("./routes/product.route");
const categoryRoute = require("./routes/category.route");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello, World!");
});

app.use("/api/products", productRoute);
app.use("/api/categories", categoryRoute);

module.exports = app;