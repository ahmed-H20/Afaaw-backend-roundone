const service = require("../services/productService");
exports.createProduct = async (req, res) =>
  res
    .status(201)
    .json({
      message: "Product created successfully",
      product: await service.createProduct(req.body),
    });
exports.getAllProducts = async (req, res) =>
  res.status(200).json({ products: await service.getAllProducts() });
exports.getProductById = async (req, res) =>
  res
    .status(200)
    .json({ product: await service.getProductById(req.params.id) });
exports.updateProduct = async (req, res) =>
  res
    .status(200)
    .json({
      message: "Product updated successfully",
      product: await service.updateProduct(req.params.id, req.body),
    });
exports.deleteProduct = async (req, res) =>
  res.status(200).json(await service.deleteProduct(req.params.id));
