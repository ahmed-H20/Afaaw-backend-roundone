const asyncHandler = require("express-async-handler");
const service = require("../services/categoryService");
exports.getAllCategories = asyncHandler(async (req, res) =>
  res.status(200).json(await service.getAllCategories()),
);
exports.getCategoryById = asyncHandler(async (req, res) =>
  res.status(200).json(await service.getCategoryById(req.params.id)),
);
exports.createCategory = asyncHandler(async (req, res) =>
  res.status(201).json(await service.createCategory(req.body)),
);
exports.getAllProductsByCategory = asyncHandler(async (req, res) =>
  res.status(200).json(await service.getAllProductsByCategory(req.params.id)),
);
