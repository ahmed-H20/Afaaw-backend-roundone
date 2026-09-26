// main routes file
import express from "express";
const router = express.Router();
import productRoute from "./product.route.js";
import reviewRoute from "./review.route.js";

router.use("/products", productRoute);
router.use("/reviews", reviewRoute);

export default router;