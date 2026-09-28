const service = require("../services/userService");
exports.getAllUsers = async (req, res) =>
  res.status(200).json(await service.getAllUsers());
exports.getUserById = async (req, res) =>
  res.status(200).json(await service.getUserById(req.params.id));
exports.createUser = async (req, res) =>
  res.status(201).json(await service.createUser(req.body));
exports.updateUser = async (req, res) =>
  res.status(200).json(await service.updateUser(req.params.id, req.body));
exports.deleteUser = async (req, res) =>
  res.status(200).json(await service.deleteUser(req.params.id));
