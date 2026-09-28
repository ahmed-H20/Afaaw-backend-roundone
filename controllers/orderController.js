const orderService = require("../services/orderService");

// The owner comes from the verified token, never the URL - a client cannot
// act on someone else's orders.
const getUserId = (req) => req.user.id;

// @desc Place an order from the user's cart
// @route POST /api/v1/orders
// @access User
const createOrder = async (req, res) => {
  const { order, items } = await orderService.createOrder(getUserId(req));
  res.status(201).json({ message: "Order placed successfully", order, items });
};

// @desc Get all of the caller's orders
// @route GET /api/v1/orders/me
// @access User
const getMyOrders = async (req, res) => {
  const orders = await orderService.getUserOrders(getUserId(req));
  res.status(200).json({ orders });
};

// @desc Get one of the caller's orders with its items
// @route GET /api/v1/orders/:orderId
// @access User
const getOrderById = async (req, res) => {
  const { order, items } = await orderService.getOrderById(
    getUserId(req),
    req.validated.params.orderId,
  );
  res.status(200).json({ order, items });
};

// @desc Cancel one of the caller's orders
// @route PATCH /api/v1/orders/:orderId/cancel
// @access User
const cancelOrder = async (req, res) => {
  const order = await orderService.cancelOrder(
    getUserId(req),
    req.validated.params.orderId,
  );
  res.status(200).json({ message: "Order cancelled", order });
};

// @desc Get every order
// @route GET /api/v1/orders
// @access Admin
const getAllOrders = async (req, res) => {
  const orders = await orderService.getAllOrders();
  res.status(200).json({ orders });
};

// @desc Update an order's status
// @route PATCH /api/v1/orders/:orderId/status
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
  getMyOrders,
  getOrderById,
  cancelOrder,
  getAllOrders,
  updateOrderStatus,
};
