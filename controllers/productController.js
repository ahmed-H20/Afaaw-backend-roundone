const productService = require("../services/productService");

exports.createProduct = async (req, res, next) => {
    return productService.createProduct(req, res, next);
};

exports.getAllProducts = async (req, res, next) => {
    return productService.getAllProducts(req, res, next);
};

exports.getProductById = async (req, res, next) => {
    return productService.getProductById(req, res, next);
};

exports.updateProduct = async (req, res, next) => {
    return productService.updateProduct(req, res, next);
};

exports.deleteProduct = async (req, res, next) => {
    return productService.deleteProduct(req, res, next);
};
