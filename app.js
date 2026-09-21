const express = require("express");
const productRoute = require("./routes/product.route");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello, World!");
});

app.use("/api/products", productRoute);

module.exports = app;