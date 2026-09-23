const orderService = require("../services/orderService");

// TODO: once auth middleware exists, take the user from req.user.id
// instead of the URL so a client can't act on someone else's orders.
const getUserId = (req) => req.validated.params.userId;

// @desc Place an order from the user's cart
// @route POST /api/orders/:userId
// @access User
const createOrder = async (req, res) => {
  const { order, items } = await orderService.createOrder(getUserId(req));
  res.status(201).json({ message: "Order placed successfully", order, items });
};

// @desc Get all of a user's orders
// @route GET /api/orders/:userId
// @access User
const getUserOrders = async (req, res) => {
  const orders = await orderService.getUserOrders(getUserId(req));
  res.status(200).json({ orders });
};

// @desc Get one of a user's orders with its items
// @route GET /api/orders/:userId/:orderId
// @access User
const getOrderById = async (req, res) => {
  const { order, items } = await orderService.getOrderById(
    getUserId(req),
    req.validated.params.orderId,
  );
  res.status(200).json({ order, items });
};

// @desc Cancel one of a user's orders
// @route PATCH /api/orders/:userId/:orderId/cancel
// @access User
const cancelOrder = async (req, res) => {
  const order = await orderService.cancelOrder(
    getUserId(req),
    req.validated.params.orderId,
  );
  res.status(200).json({ message: "Order cancelled", order });
};

// @desc Get every order
// @route GET /api/orders
// @access Admin
const getAllOrders = async (req, res) => {
  const orders = await orderService.getAllOrders();
  res.status(200).json({ orders });
};

// @desc Update an order's status
// @route PATCH /api/orders/:orderId/status
// @access Admin
const updateOrderStatus = async (req, res) => {
  const order = await orderService.updateOrderStatus(
    req.validated.params.orderId,
    req.validated.body.status,
  );
  res.status(200).json({ message: "Order status updated", order });
};

module.exports = {
  createOrder,
  getUserOrders,
  getOrderById,
  cancelOrder,
  getAllOrders,
  updateOrderStatus,
};
