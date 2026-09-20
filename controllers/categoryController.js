const Category = require("../models/category");
const Product = require("../models/productsModel");

exports.findAll = () => Category.find();
exports.findById = (id) => Category.findById(id);
exports.create = (data) => Category.create(data);
exports.findProducts = (categoryId) => Product.find({ category: categoryId });
