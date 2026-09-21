const Category = require("../models/categories");
const Product = require("../models/productsModel");

// @desc Create a new category
// @route POST /api/categories
// @access Admin
const creatCategory = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ msg: "name is required" });
    }
    const category = await Category.create({
      name: name,
    });
    res.status(201).json({ category });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: " category didnt creat" });
  }
};

// @desc get all categories
// @route get /api/categories
// @access public
const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json({ categories });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "somthing wrong" });
  }
};

// @desc get category by ID
// @route get /api/categories:id
// @access public
const singleCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ msg: `No category with id ${categoryId}` });
    }
    res.status(200).json({ category });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "somthing wrong" });
  }
};

// @desc delete category
// @route DELETE/api/categories/:id
// @access Admin
const deleteCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const category = await Category.findByIdAndDelete(categoryId);
    if (!category) {
      return res.status(404).json({ msg: `No category with id ${categoryId}` });
    }
    res.status(200).json({ msg: "category deleted successfully ", data: null });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "somthing wrong" });
  }
};

// @desc update category
// @route PUT /api/categories/:id
// @access Admin
const updateCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const category = await Category.findByIdAndUpdate(categoryId, req.body, {
      new: true,
    });
    if (!category) {
      return res.status(404).json({ msg: `No category with id ${categoryId}` });
    }
    res.status(200).json({ category });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "somthing wrong" });
  }
};

// @desc get all product by category
// @route get  /api/categories/:categoryId/product
// @access Admin
const getProductsByCategory = async (req, res) => {
try {
    const { categoryId } = req.params;
    const products = await Product.find({ category: categoryId });
    res.status(200).json({ products });
} catch (error) {
    res.status(500).json({
    msg: error.message,
    });
}
};

module.exports = {
creatCategory,
getAllCategories,
singleCategory,
deleteCategory,
updateCategory,
getProductsByCategory,
};
