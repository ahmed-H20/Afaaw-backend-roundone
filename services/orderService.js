const Order = require("../models/orderModel");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/ApiError");

// @desc Create a new order
// @route POST /api/orders
// @access Public
const createOrder = asyncHandler(async (req, res, next) => {
  const order = await Order.create(req.body);
  res.status(201).json({ message: "Order created successfully ✅", order });
});

// desc Get all orders
// @route GET /api/orders
// @access Public
const getAllOrders = asyncHandler(async (req, res, next) => {
  const orders = await Order.find();
  res.status(200).json({ message: "Orders fetched successfully ✅", orders });
});

// desc Get an order by id
// @route GET /api/orders/:id
// @access Public
const getOrderById = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    return next(new ApiError("Order not found", 404));
  }
  res.status(200).json({ message: "Order fetched successfully ✅", order });
});

// desc Update an order
// @route PUT /api/orders/:id
// @access Public
const updateOrder = asyncHandler(async (req, res, next) => {
  const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!order) {
    return next(new ApiError("Order not found", 404));
  }
  res.status(200).json({ message: "Order updated successfully ✅", order });
});

// desc Delete an order
// @route DELETE /api/orders/:id
// @access Public
const deleteOrder = asyncHandler(async (req, res, next) => {
  const order = await Order.findByIdAndDelete(req.params.id);
  if (!order) {
    return next(new ApiError("Order not found", 404));
  }
  res.status(200).json({ message: "Order deleted successfully ✅", order });
});

module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
};
