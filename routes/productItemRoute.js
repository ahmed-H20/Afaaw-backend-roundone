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

productItemRouter.post("/", createProductItem);
productItemRouter.get("/", getAllProductItems);
productItemRouter.get("/product/:productId", getProductItemsByProductId);
productItemRouter.get("/:id", getProductItemById);
productItemRouter.put("/:id", updateProductItem);
productItemRouter.delete("/:id", deleteProductItem);

module.exports = productItemRouter;
