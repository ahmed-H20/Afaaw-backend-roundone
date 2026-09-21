const express = require("express");
const productRoute = require("./routes/productRoute");
const reviewRoutes = require("./routes/reviewRoutes");
const userRoute = require("./routes/userRoutes");
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.use("/api/products", productRoute);
app.use("/api/reviews", reviewRoutes);
app.use("/api/users", userRoute);

module.exports = app;
