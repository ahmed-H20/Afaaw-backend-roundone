const Category = require('../models/categories');

// @desc Create a new category
// @route POST /api/categories
// @access Admin
const createCategory = async (req, res, next) => {
	try {
		const { name } = req.body;
		if (!name) {
			return res.status(400).json({ message: 'Category name is required' });
		}
		const category = await Category.create({ name });
		res
			.status(201)
			.json({ message: 'Category created successfully', category });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Error creating category' });
	}
};

// @desc Get all categories
// @route GET /api/categories
// @access Public
const getAllCategories = async (req, res, next) => {
	try {
		const categories = await Category.find();
		res.status(200).json({ categories });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Error fetching categories' });
	}
};

// @desc Get category by ID
// @route GET /api/categories/:id
// @access Public
const getCategoryById = async (req, res, next) => {
	try {
		const category = await Category.findById(req.params.id);
		if (!category) {
			return res.status(404).json({ message: 'Category not found' });
		}
		res.status(200).json({ category });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Error fetching category' });
	}
};

// @desc Update category
// @route PUT /api/categories/:id
// @access Admin
const updateCategory = async (req, res, next) => {
	try {
		const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
		});
		if (!category) {
			return res.status(404).json({ message: 'Category not found' });
		}
		res
			.status(200)
			.json({ message: 'Category updated successfully', category });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Error updating category' });
	}
};

// @desc Delete category
// @route DELETE /api/categories/:id
// @access Admin
const deleteCategory = async (req, res, next) => {
	try {
		const category = await Category.findByIdAndDelete(req.params.id);
		if (!category) {
			return res.status(404).json({ message: 'Category not found' });
		}
		res.status(200).json({ message: 'Category deleted successfully' });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Error deleting category' });
	}
};

module.exports = {
	createCategory,
	getAllCategories,
	getCategoryById,
	updateCategory,
	deleteCategory,
};
