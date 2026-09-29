// main routes file
import express from "express";
const router = express.Router();
import cartRoute from "./cart.route.js";
import productRoute from "./product.route.js";
import reviewRoute from "./review.route.js";

router.use("/carts", cartRoute);
router.use("/products", productRoute);
router.use("/reviews", reviewRoute);

export default router;