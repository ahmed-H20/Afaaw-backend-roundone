const express = require("express");
const {
  createProductValidator,
} = require("../utils/Validations/productValidation");
const router = express.Router();
const {
  uploadSingleImage,
  resizeImage,
} = require("../services/productService");
const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../services/productService");
const { protect, allowedTo } = require("../services/authService");

router.post(
  "/",
  uploadSingleImage,
  resizeImage,
  createProductValidator,
  createProduct,
);
router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
