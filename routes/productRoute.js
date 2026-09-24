const express = require("express");
const router = express.Router();
const {
  createProductValidation,
  productIdValidation,
} = require("../utils/validations/productValidation");

const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../services/productService");

// createProductValidation > validationMiddleware > asyncHandler > globalErrorHandler
router.post("/", createProductValidation, createProduct);
router.get("/", getAllProducts);
router.get("/:id", productIdValidation, getProductById);
router.put("/:id", productIdValidation, updateProduct);
router.delete("/:id", productIdValidation, deleteProduct);

module.exports = router;
