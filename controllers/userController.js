const asyncHandler = require("express-async-handler");
const service = require("../services/userService");
exports.getAllUsers = asyncHandler(async (req, res) =>
  res.status(200).json(await service.getAllUsers()),
);
exports.getUserById = asyncHandler(async (req, res) =>
  res.status(200).json(await service.getUserById(req.params.id)),
);
exports.createUser = asyncHandler(async (req, res) =>
  res.status(201).json(await service.createUser(req.body)),
);
exports.updateUser = asyncHandler(async (req, res) =>
  res.status(200).json(await service.updateUser(req.params.id, req.body)),
);
exports.deleteUser = asyncHandler(async (req, res) =>
  res.status(200).json(await service.deleteUser(req.params.id)),
);
