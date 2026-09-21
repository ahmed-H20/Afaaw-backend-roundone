const mongoose = require("mongoose");

// Unlike a cart item, an order item snapshots the product's name and price
// at checkout, so order history doesn't change when a product is edited later.
const orderItemSchema = new mongoose.Schema(
  {
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true, min: 1 },
    color: String,
    size: String,
  },
  {
    timestamps: true,
  },
);

// Every order read filters on orderId.
orderItemSchema.index({ orderId: 1 });

const OrderItem = mongoose.model("OrderItem", orderItemSchema);
module.exports = OrderItem;
