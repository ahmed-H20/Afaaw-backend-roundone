const express = require("express");
const { authenticate, authorize } = require("../middlewares/auth.middleware");
const router = express.Router();

const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
const {
  createProductValidator,
  getProductValidator,
  updateProductValidator,
  deleteProductValidator,
} = require("../utils/validators/product.validator");

router.post(
  "/",
  authenticate,
  authorize("admin"),
  createProductValidator,
  createProduct,
);
router.get("/", getAllProducts);
router.get("/:id", getProductValidator, getProductById);
router.put(
  "/:id",
  authenticate,
  authorize("admin"),
  updateProductValidator,
  updateProduct,
);
router.delete(
  "/:id",
  authenticate,
  authorize("admin"),
  deleteProductValidator,
  deleteProduct,
);

module.exports = router;
