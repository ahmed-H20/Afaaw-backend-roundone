const Order = require("../models/order.model");

const createOrder = async (data) => {
  return await Order.create(data);
};

const getAllOrders = async () => {
  return await Order.find().populate("userId", "-password");
};

const getOrderById = async (id) => {
  return await Order.findById(id).populate("userId", "-password");
};

const getOrdersByUserId = async (userId) => {
  return await Order.find({ userId }).populate("userId", "-password");
};

const updateOrder = async (id, data) => {
  return await Order.findByIdAndUpdate(id, data, {
    returnDocument: "after",
    runValidators: true,
  }).populate("userId", "-password");
};

const deleteOrder = async (id) => {
  return await Order.findByIdAndDelete(id);
};

module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  getOrdersByUserId,
  updateOrder,
  deleteOrder,
};
