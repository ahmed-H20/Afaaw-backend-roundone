const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
      unique: true,
    },
  },
  { timestamps: true },
);

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
