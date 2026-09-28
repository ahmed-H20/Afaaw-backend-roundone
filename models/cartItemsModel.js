const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema(
  {
    quantity: { type: Number, required: true, min: 1, default: 1 },
    color: String,
    size: String,
    cartId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cart",
      required: true,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

// Every cart read filters on cartId.
cartItemSchema.index({ cartId: 1 });

const CartItem = mongoose.model("CartItem", cartItemSchema);
module.exports = CartItem;
