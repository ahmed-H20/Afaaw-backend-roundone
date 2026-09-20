const mongoose = require("mongoose");

const orderItemsSchema = new mongoose.Schema(
  {
    quantity: Number,
    color: String,
    size: String,
    cartId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cart",
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  },
  {
    timestamps: true,
  },
);

const CartItem = mongoose.model("CartItem", orderItemsSchema);
module.exports = CartItem;