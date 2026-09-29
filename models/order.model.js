import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
    totalAmount: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    inventoryRestocked: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true },
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
