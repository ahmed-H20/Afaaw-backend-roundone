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

const {
  createProductItemSchema,
  productItemIdSchema,
  productIdSchema,
  updateProductItemSchema,
} = require("../validations/productItem.validation");

productItemRouter.post(
  "/",
  validate(createProductItemSchema),
  createProductItem
);

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

productItemRouter.put(
  "/:id",
  validate(updateProductItemSchema),
  updateProductItem
);

productItemRouter.delete(
  "/:id",
  validate(productItemIdSchema),
  deleteProductItem
);

module.exports = productItemRouter;