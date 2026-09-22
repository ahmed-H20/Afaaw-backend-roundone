const orderController = require("../controllers/orderController");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/ApiError");

exports.getAllOrders = asyncHandler(async (req, res) => {
  const orders = await orderController.findAll();
  res.status(200).json(orders);
});

exports.getOrderItems = asyncHandler(async (req, res) => {
  const orderItems = await orderController.findItemsByOrderId(
    req.params.orderId,
  );
  if (!orderItems) {
    throw new ApiError("order not found", 404);
  }
  res.status(200).json(orderItems);
});

exports.getAllOrdersByUser = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const orders = await orderController.findByUserId(id);
  res.status(200).json(orders);
});

exports.createOrder = asyncHandler(async (req, res) => {
  const { items } = req.body;

  const order = await orderController.create({ userId: req.user.id });
  const orderItems = await orderController.createItems(order._id, items);
  await orderController.clearCart(cart._id);

  res.status(201).json({ order, items: orderItems });
});

exports.updateOrderStatus = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const { status } = req.body;
  const order = await orderController.updateStatus(id, status);
  if (!order) {
    throw new ApiError("Order not found", 404);
  }
  res.status(201).json(order);
});

exports.softDeleteOrder = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const order = await orderController.softDelete(id);
  if (!order) {
    throw new ApiError("Order not found", 404);
  }
  res.status(201).json(order);
});
