import * as productService from "../services/product.service.js";

const getAllProducts = async (req, res) => {
	const products = await productService.getAllProducts();
	res.json(products);
};

const getProductById = async (req, res) => {
	const product = await productService.getProductById(req.validated.params.id);
	res.json(product);
};

const createProduct = async (req, res) => {
	const product = await productService.createProduct(req.validated.body);
	res.status(201).json(product);
};

const updateProduct = async (req, res) => {
	const product = await productService.updateProduct(req.validated.params.id, req.validated.body);
	res.json(product);
};

const deleteProduct = async (req, res) => {
	const product = await productService.deleteProduct(req.validated.params.id);
	res.json({ message: "Product deleted successfully", product });
};

export {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};