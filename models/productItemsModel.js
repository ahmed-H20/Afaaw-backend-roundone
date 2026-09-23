const mongoose = require("mongoose");

const productItemsSchema = new mongoose.Schema(
  {
    quantity: Number,
    color: String,
    size: String,
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
    },
    price: {
      type: Number,
    },
  },
  {
    timestamps: true,
  },
);

const ProductItems = mongoose.model("ProductItems", productItemsSchema);
module.exports = ProductItems;
