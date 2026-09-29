const express = require("express");

const productItemRouter = express.Router();

const {
  createProductItem,
  getAllProductItems,
  getProductItemById,
  getProductItemsByProductId,
  updateProductItem,
  deleteProductItem,
} = require("../services/productItemService");

const validate = require("../middlewares/validation.middleware");
const { protect, allowedTo } = require("../middlewares/auth.middleware");

const {
  createProductItemSchema,
  productItemIdSchema,
  productIdSchema,
  updateProductItemSchema,
} = require("../validations/productItem.validation");

// Public routes
productItemRouter.get("/", getAllProductItems);

productItemRouter.get(
  "/product/:productId",
  validate(productIdSchema),
  getProductItemsByProductId
);

productItemRouter.get(
  "/:id",
  validate(productItemIdSchema),
  getProductItemById
);

// Admin restricted routes
productItemRouter.post(
  "/",
  protect,
  allowedTo("admin"),
  validate(createProductItemSchema),
  createProductItem
);

productItemRouter.put(
  "/:id",
  protect,
  allowedTo("admin"),
  validate(updateProductItemSchema),
  updateProductItem
);

productItemRouter.delete(
  "/:id",
  protect,
  allowedTo("admin"),
  validate(productItemIdSchema),
  deleteProductItem
);

module.exports = productItemRouter;