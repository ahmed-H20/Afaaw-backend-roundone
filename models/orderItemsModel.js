const mongoose = require("mongoose");

const orderItemsSchema = new mongoose.Schema(
  {
    quantity: Number,
    color: String,
    size: String,
    price: Number,
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
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

const OrderItems = mongoose.model("OrderItems", orderItemsSchema);
module.exports = OrderItems;
