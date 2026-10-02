const express = require("express");
const {
  createProductValidator,
} = require("../utils/Validations/productValidation");
const router = express.Router();

const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../services/productService");
const { protect, allowedTo } = require("../services/authService");

router.post("/", createProductValidator, createProduct);
router.get("/", protect, allowedTo("user"), getAllProducts);
router.get("/:id", getProductById);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
