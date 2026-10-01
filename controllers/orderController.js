const service = require("../services/orderService");
exports.getAllOrders = async (req, res) =>
  res.status(200).json(await service.getAllOrders());
exports.getOrderItems = async (req, res) =>
  res.status(200).json(await service.getOrderItems(req.params.orderId));
exports.getAllOrdersByUser = async (req, res) =>
  res.status(200).json(await service.getAllOrdersByUser(req.params.id));
exports.createOrder = async (req, res) =>
  res.status(201).json(await service.createOrder(req.user.id, req.body.items));
exports.updateOrderStatus = async (req, res) =>
  res
    .status(200)
    .json(await service.updateOrderStatus(req.params.id, req.body.status));
exports.softDeleteOrder = async (req, res) =>
  res.status(200).json(await service.softDeleteOrder(req.params.id));
