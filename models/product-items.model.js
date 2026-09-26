import mongoose from "mongoose";

const productItemsSchema = new mongoose.Schema(
  {
    quantity: Number,
    color: String,
    size: String,
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  },
  {
    timestamps: true,
  },
);

export const ProductItems = mongoose.model("ProductItems", productItemsSchema);
