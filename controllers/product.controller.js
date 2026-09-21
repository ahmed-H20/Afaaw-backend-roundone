const productService = require("../services/product.service");

// @desc Create a new product
// @route POST /api/products
// @access Admin
const createProduct = async (req, res, next) => {
  try {
    const product = await productService.createProduct(req.body);
    res.status(201).json({ message: "Product created successfully", product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating product" });
  }
};

// @desc Get all products
// @route GET /api/products
// @access Public
const getAllProducts = async (req, res, next) => {
    try {
        const products = await productService.getAllProducts();
        res.status(200).json({ products });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching products" });
    }
}

// @desc Get product by ID
// @route GET /api/products/:id
// @access Public
const getProductById = async (req, res, next) => {
    try {
        const product = await productService.getProductById(req.params.id); 

        if(!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({ product });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching product" });
    }
}

// @desc Update a product
// @route PUT /api/products/:id
// @access Admin
const updateProduct = async (req, res, next) => {
  try {
    const product = await productService.updateProduct(
      req.params.id,
      req.body
    );

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json({
      message: "Product updated successfully",
      product,
    });
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
    const product = await productService.deleteProduct(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json({
      message: "Product deleted successfully",
    });
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
};