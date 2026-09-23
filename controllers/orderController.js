const asyncHandler = require("express-async-handler");
const service = require("../services/orderService");
exports.getAllOrders = asyncHandler(async (req, res) =>
  res.status(200).json(await service.getAllOrders()),
);
exports.getOrderItems = asyncHandler(async (req, res) =>
  res.status(200).json(await service.getOrderItems(req.params.orderId)),
);
exports.getAllOrdersByUser = asyncHandler(async (req, res) =>
  res.status(200).json(await service.getAllOrdersByUser(req.params.id)),
);
exports.createOrder = asyncHandler(async (req, res) =>
  res.status(201).json(await service.createOrder(req.user.id, req.body.items)),
);
exports.updateOrderStatus = asyncHandler(async (req, res) =>
  res
    .status(200)
    .json(await service.updateOrderStatus(req.params.id, req.body.status)),
);
exports.softDeleteOrder = asyncHandler(async (req, res) =>
  res.status(200).json(await service.softDeleteOrder(req.params.id)),
);
