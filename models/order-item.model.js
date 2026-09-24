const mongoose = require("mongoose");

const productItemsSchema = new mongoose.Schema(
  {
    quantity: {
      type: Number,
      required: [true, "Quantity is required"],
      min: [1, "Quantity must be at least 1"],
      validate: {
        validator: Number.isInteger,
        message: "Quantity must be an integer",
      },
    },

    color: {
      type: String,
      trim: true,
      maxlength: [30, "Color cannot exceed 30 characters"],
    },

    size: {
      type: String,
      trim: true,
      maxlength: [20, "Size cannot exceed 20 characters"],
    },

    cartId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cart",
      required: [true, "Cart ID is required"],
    },

    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: [true, "Product ID is required"],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const ProductItem = mongoose.model("ProductItem", productItemsSchema);

module.exports = ProductItem;
