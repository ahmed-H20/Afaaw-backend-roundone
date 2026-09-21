const mongoose = require("mongoose");

const cartItemsSchema = new mongoose.Schema(
  {
    quantity: {type : Number, default : 1} ,
    color: String,
    size: String,
    cartId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cart",
      required : true
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

module.exports =  mongoose.model("CartItem", cartItemsSchema);
