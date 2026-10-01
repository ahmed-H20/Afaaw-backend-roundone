const mongoose = require("mongoose");

const cartItemsSchema = new mongoose.Schema(
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

const CartItems = mongoose.model("CartItems", cartItemsSchema);
module.exports = CartItems;
