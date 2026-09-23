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

const {
  createProductSchema,
  productIdSchema,
  updateProductSchema,
} = require("../validations/product.validation");

productRouter.post(
  "/",
  validate(createProductSchema),
  createProduct
);

productRouter.get("/", getAllProducts);

productRouter.get(
  "/:id",
  validate(productIdSchema),
  getProductById
);

productRouter.put(
  "/:id",
  validate(updateProductSchema),
  updateProduct
);

productRouter.delete(
  "/:id",
  validate(productIdSchema),
  deleteProduct
);

module.exports = productRouter;