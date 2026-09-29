const express = require("express");

const productRouter = express.Router();

const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../services/productService");

const validate = require("../middlewares/validation.middleware");
const { protect, allowedTo } = require("../middlewares/auth.middleware");

const {
  createProductSchema,
  productIdSchema,
  updateProductSchema,
} = require("../validations/product.validation");

// Public routes
productRouter.get("/", getAllProducts);
productRouter.get("/:id", validate(productIdSchema), getProductById);

// Admin restricted routes
productRouter.post(
  "/",
  protect,
  allowedTo("admin"),
  validate(createProductSchema),
  createProduct
);

productRouter.put(
  "/:id",
  protect,
  allowedTo("admin"),
  validate(updateProductSchema),
  updateProduct
);

productRouter.delete(
  "/:id",
  protect,
  allowedTo("admin"),
  validate(productIdSchema),
  deleteProduct
);

module.exports = productRouter;