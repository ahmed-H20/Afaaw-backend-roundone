const Order = require("../models/orderModel");
const OrderItems = require("../models/orderItemsModel");
const ApiError = require("../utils/ApiError");

exports.getAllOrders = () =>
  Order.find({ isDeleted: false }).populate("userId");
exports.getOrderItems = async (orderId) => {
  const items = await OrderItems.find({ orderId });
  if (!items) throw new ApiError("order not found", 404);
  return items;
};
exports.getAllOrdersByUser = (userId) =>
  Order.find({ userId, isDeleted: false });
exports.createOrder = async (userId, items) => {
  const order = await Order.create({ userId });
  const orderItems = await OrderItems.insertMany(
    items.map((item) => ({ ...item, orderId: order._id })),
  );
  return { order, items: orderItems };
};
exports.updateOrderStatus = async (id, status) => {
  const order = await Order.findOneAndUpdate(
    { _id: id, isDeleted: false },
    { status },
    { new: true },
  );
  if (!order) throw new ApiError("Order not found", 404);
  return order;
};
exports.softDeleteOrder = async (id) => {
  const order = await Order.findOneAndUpdate(
    { _id: id, isDeleted: false },
    { isDeleted: true },
    { new: true },
  );
  if (!order) throw new ApiError("Order not found", 404);
  return order;
};
