const express = require('express');
const router = express.Router();
const {
	createCategory,
	getAllCategories,
	getCategoryById,
	updateCategory,
	deleteCategory,
} = require('../services/categoryService');
const {
	createCategoryValidator,
	updateCategoryValidator,
	categoryIdValidator,
} = require('../utils/validation/categoryValidation');

router.post('/', createCategoryValidator, createCategory);
router.get('/', getAllCategories);
router.get('/:id', categoryIdValidator, getCategoryById);
router.put('/:id', updateCategoryValidator, updateCategory);
router.delete('/:id', categoryIdValidator, deleteCategory);

module.exports = router;
