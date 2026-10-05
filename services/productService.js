const Product = require("../models/productsModel");
const asyncHandler = require("express-async-handler");
const multer = require("multer");
const sharp = require("sharp");

// disc Storage
// const Storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/products");
//   },
//   filename: function (req, file, cb) {
//     const extention = file.mimetype.split("/")[1];
//     const fileName = `product-${Date.now()}.${extention}`;
//     cb(null, fileName);
//   },
// });

const resizeImage = async (req, res, next) => {
  const FileName = `product-${Date.now()}.jpeg`;
  await sharp(req.file.buffer)
    .resize(600, 600)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`uploads/products/${FileName}`);

  req.body.coverImage = FileName;

  next();
};

const FilterImage = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed!"), false);
  }
};

const Storage = multer.memoryStorage();

const upload = multer({
  dest: "uploads/products",
  storage: Storage,
  fileFilter: FilterImage,
});

const uploadSingleImage = upload.single("coverImage");
// @desc Create a new product
// @route POST /api/products
// @access Admin
const createProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.create(req.body);
  res.status(201).json({ message: "Product created successfully", product });
});

// @desc Get all products
// @route GET /api/products
// @access Public
const getAllProducts = asyncHandler(async (req, res, next) => {
  const products = await Product.find();
  res.status(200).json({ products });
});
// @desc Get a product by ID
// @route GET /api/products/:id
// @access Public
const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching product" });
  }
};

// @desc Update a product
// @route PUT /api/products/:id
// @access Admin
const updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product updated successfully", product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating product" });
  }
};

// @desc Delete a product
// @route DELETE /api/products/:id
// @access Admin
const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting product" });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  uploadSingleImage,
  resizeImage,
};
