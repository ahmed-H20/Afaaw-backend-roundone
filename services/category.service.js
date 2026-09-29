import AppError from "../errors/app-error.js";
import { Categories } from "../models/category.model.js";
import Product from "../models/product.model.js";

const getAllCategories = async () => Categories.find().lean();

const getCategoryById = async (id) => {
	const category = await Categories.findById(id).lean();
	if (!category) {
		throw new AppError("Category not found", 404);
	}
	return category;
};

const createCategory = async (categoryData) => {
	const category = new Categories(categoryData);
	return category.save();
};

const updateCategory = async (id, categoryData) => {
	const category = await Categories.findByIdAndUpdate(id, categoryData, {
		returnDocument: "after",
		runValidators: true,
	}).lean();
	if (!category) {
		throw new AppError("Category not found", 404);
	}
	return category;
};

const deleteCategory = async (id) => {
	const hasProducts = await Product.exists({ category: id });
	if (hasProducts) {
		throw new AppError("Category is assigned to one or more products", 409);
	}

	const category = await Categories.findByIdAndDelete(id).lean();
	if (!category) {
		throw new AppError("Category not found", 404);
	}
	return category;
};

export { createCategory, deleteCategory, getAllCategories, getCategoryById, updateCategory };