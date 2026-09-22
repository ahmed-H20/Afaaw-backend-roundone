const Order = require("../models/orderModel");
const OrderItems = require("../models/orderItemsModel");
const CartItems = require("../models/cartItemsModel");

exports.findAll = () => Order.find({ isDeleted: false }).populate("userId");
exports.findItemsByOrderId = (orderId) => OrderItems.findOne({ orderId, isDeleted: false });
exports.findByUserId = (id) => Order.find({ id, isDeleted: false });
exports.create = (data) => Order.create(data);
exports.createItems = (items) => OrderItems.insertMany(items);
exports.clearCart = (cartId) => CartItems.deleteMany({ cartId });
exports.updateStatus = (id, status) => Order.findOneAndUpdate(
  { id, isDeleted: false },
  { status },
  { new: true },
);
exports.softDelete = (id) => Order.findOneAndUpdate(
  { id, isDeleted: false },
  { isDeleted: true },
  { new: true },
);
