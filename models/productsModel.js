// create schema
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    // category: {
    //   type: mongoose.Schema.ObjectId,
    //   ref: "Category",
    // },
    coverImage: String,
    images: [String],
  },
  { timestamps: true },
);

const returnImageUrl = function (doc) {
  if (doc.coverImage) {
    doc.coverImage = `${process.env.BASE_URL}/products/${doc.coverImage}`;
  }
};

// return image url
productSchema.post("save", returnImageUrl);
productSchema.post("init", returnImageUrl);
productSchema.post(/^find^/, returnImageUrl);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
