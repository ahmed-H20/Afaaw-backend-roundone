import * as categoryService from "../services/category.service.js";

const getAllCategories = async (req, res) => {
	const categories = await categoryService.getAllCategories();
	res.json(categories);
};

const getCategoryById = async (req, res) => {
	const category = await categoryService.getCategoryById(req.validated.params.id);
	res.json(category);
};

const createCategory = async (req, res) => {
	const category = await categoryService.createCategory(req.validated.body);
	res.status(201).json(category);
};

const updateCategory = async (req, res) => {
	const category = await categoryService.updateCategory(req.validated.params.id, req.validated.body);
	res.json(category);
};

const deleteCategory = async (req, res) => {
	const category = await categoryService.deleteCategory(req.validated.params.id);
	res.json({ message: "Category deleted successfully", category });
};

export { createCategory, deleteCategory, getAllCategories, getCategoryById, updateCategory };