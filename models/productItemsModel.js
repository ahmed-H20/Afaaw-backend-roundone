const mongoose = require("mongoose");

const productItemsSchema = new mongoose.Schema(
  {
    quantity:{
      type : Number ,
      default : 1
    } ,
    color: String,
    size: String,
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required : true
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("ProductItems", productItemsSchema);
