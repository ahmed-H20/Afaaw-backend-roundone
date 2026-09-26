const OrderItem = require("../models/orderItemsModel");
const Order = require("../models/orderModel");
const Product = require("../models/productsModel");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/ApiError");

// @desc Create a new order item
// @route POST /api/order-items
// @access Public
const createOrderItem = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.body.orderId);
  if (!order) {
    return next(new ApiError("Order not found", 404));
  }

  const product = await Product.findById(req.body.productId);
  if (!product) {
    return next(new ApiError("Product not found", 404));
  }

  const orderItem = await OrderItem.create(req.body);
  res
    .status(201)
    .json({ message: "Order item created successfully ✅", orderItem });
});

// @desc Get all order items
// @route GET /api/order-items
// @access Public
const getAllOrderItems = asyncHandler(async (req, res, next) => {
  const orderItems = await OrderItem.find();
  res
    .status(200)
    .json({ message: "Order items fetched successfully ✅", orderItems });
});

// @desc Get an order item by id
// @route GET /api/order-items/:id
// @access Public
const getOrderItemById = asyncHandler(async (req, res, next) => {
  const orderItem = await OrderItem.findById(req.params.id);
  if (!orderItem) {
    return next(new ApiError("Order item not found", 404));
  }
  res
    .status(200)
    .json({ message: "Order item fetched successfully ✅", orderItem });
});

// @desc Update an order item
// @route PUT /api/order-items/:id
// @access Public
const updateOrderItem = asyncHandler(async (req, res, next) => {
  delete req.body.orderId;
  const orderItem = await OrderItem.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
  );
  if (!orderItem) {
    return next(new ApiError("Order item not found", 404));
  }
  res
    .status(200)
    .json({ message: "Order item updated successfully ✅", orderItem });
});

// @desc Delete an order item
// @route DELETE /api/order-items/:id
// @access Public
const deleteOrderItem = asyncHandler(async (req, res, next) => {
  const orderItem = await OrderItem.findByIdAndDelete(req.params.id);
  if (!orderItem) {
    return next(new ApiError("Order item not found", 404));
  }
  res
    .status(200)
    .json({ message: "Order item deleted successfully ✅", orderItem });
});

module.exports = {
  createOrderItem,
  getAllOrderItems,
  getOrderItemById,
  updateOrderItem,
  deleteOrderItem,
};
