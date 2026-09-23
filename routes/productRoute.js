const express = require('express');
const router = express.Router();

const {
	createProduct,
	getAllProducts,
	getProductById,
	updateProduct,
	deleteProduct,
} = require('../services/productService');

const {
	createProductValidator,
	updateProductValidator,
	productIdValidator,
} = require('../utils/validation/productValidation');

router.post('/', createProductValidator, createProduct);
router.get('/', getAllProducts);
router.get('/:id', productIdValidator, getProductById);
router.put('/:id', updateProductValidator, updateProduct);
router.delete('/:id', productIdValidator, deleteProduct);

module.exports = router;
