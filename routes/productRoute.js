const express = require("express");
const router = express.Router();
const {
  createProductValidation,
} = require("../utils/validations/productValidation");

const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../services/productService");

router.post("/", createProductValidation, createProduct);
router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
