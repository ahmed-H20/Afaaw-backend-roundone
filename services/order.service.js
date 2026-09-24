const Order = require("../models/order.model");
const ApiError = require("../utils/ApiError");
const httpStatusText = require("../constants/httpStatusText");

const createOrder = async (data) => {
  return await Order.create(data);
};

const getAllOrders = async () => {
  return await Order.find().populate("userId", "-password");
};

const getOrderById = async (id) => {
  const order = await Order.findById(id).populate("userId", "-password");

  if (!order) {
    throw new ApiError(404, "Order not found", httpStatusText.FAIL);
  }

  return order;
};

const getOrdersByUserId = async (userId) => {
  return await Order.find({ userId }).populate("userId", "-password");
};

const updateOrder = async (id, data) => {
  const order = await Order.findByIdAndUpdate(id, data, {
    returnDocument: "after",
    runValidators: true,
  }).populate("userId", "-password");

  if (!order) {
    throw new ApiError(404, "Order not found", httpStatusText.FAIL);
  }

  return order;
};

const deleteOrder = async (id) => {
  const order = await Order.findByIdAndDelete(id);

  if (!order) {
    throw new ApiError(404, "Order not found", httpStatusText.FAIL);
  }

  return order;
};

module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  getOrdersByUserId,
  updateOrder,
  deleteOrder,
};
