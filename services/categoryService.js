const Category = require("../models/categories");

const createCategory = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) return res.status(400).json({ message: "name is required" });
        const category = await Category.create({ name });
        res.status(201).json({ category });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error creating category" });
    }
};

const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json({ categories });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching categories" });
    }
};

const getCategoryById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) return res.status(404).json({ message: "Category not found" });
        res.status(200).json({ category });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching category" });
    }
};

const updateCategory = async (req, res) => {
    try {
        const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!category) return res.status(404).json({ message: "Category not found" });
        res.status(200).json({ category });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating category" });
    }
};

const deleteCategory = async (req, res) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id);
        if (!category) return res.status(404).json({ message: "Category not found" });
        res.status(200).json({ message: "Category deleted" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error deleting category" });
    }
};

module.exports = { createCategory, getAllCategories, getCategoryById, updateCategory, deleteCategory };
