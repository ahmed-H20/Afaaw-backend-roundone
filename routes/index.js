// main routes file
import express from "express";
const router = express.Router();
import cartRoute from "./cart.route.js";
import categoryRoute from "./category.route.js";
import orderRoute from "./order.route.js";
import productRoute from "./product.route.js";
import reviewRoute from "./review.route.js";
import authRoute from "./auth.route.js";
import userRoute from "./user.route.js";

router.use("/carts", cartRoute);
router.use("/categories", categoryRoute);
router.use("/orders", orderRoute);
router.use("/products", productRoute);
router.use("/reviews", reviewRoute);
router.use("/auth", authRoute);
router.use("/users", userRoute);

export default router;