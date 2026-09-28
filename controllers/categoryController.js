const service = require("../services/categoryService");
exports.getAllCategories = async (req, res) =>
  res.status(200).json(await service.getAllCategories());
exports.getCategoryById = async (req, res) =>
  res.status(200).json(await service.getCategoryById(req.params.id));
exports.createCategory = async (req, res) =>
  res.status(201).json(await service.createCategory(req.body));
exports.getAllProductsByCategory = async (req, res) =>
  res.status(200).json(await service.getAllProductsByCategory(req.params.id));
