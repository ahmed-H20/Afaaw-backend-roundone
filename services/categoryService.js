const Category = require("../models/category");
const Product = require("../models/productsModel");
const ApiError = require("../utils/ApiError");

exports.getAllCategories = () => Category.find();

exports.getCategoryById = async (id) => {
  const category = await Category.findById(id);
  if (!category) throw new ApiError("Category not found", 404);
  return category;
};

exports.createCategory = ({ name }) => Category.create({ name });

exports.getAllProductsByCategory = (id) => Product.find({ category: id });
