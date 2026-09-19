const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1.0,
      max: 5.0,
    },
    comment: {
      type: String,
      maxlength: 200,
    },
  },
  { timestamps: true },
);

export const Review = mongoose.model("Review", reviewSchema);
