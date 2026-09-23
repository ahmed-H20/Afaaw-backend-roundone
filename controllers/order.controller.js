const orderService = require("../services/order.service");
const httpStatusText = require("../constants/httpStatusText");

// @desc Create a new order
// @route POST /api/orders
// @access Public
const createOrder = async (req, res) => {
  const order = await orderService.createOrder(req.body);
  res.status(201).json({
    status: httpStatusText.SUCCESS,
    message: "Order created successfully",
    data: { order },
  });
};

// @desc Get all orders
// @route GET /api/orders
// @access Admin
const getAllOrders = async (req, res) => {
  const orders = await orderService.getAllOrders();
  res.status(200).json({
    status: httpStatusText.SUCCESS,
    message: "Orders retrieved successfully",
    data: { orders },
  });
};

// @desc Get order by ID
// @route GET /api/orders/:id
// @access Public
const getOrderById = async (req, res) => {
  const order = await orderService.getOrderById(req.params.id);
  res.status(200).json({
    status: httpStatusText.SUCCESS,
    message: "Order retrieved successfully",
    data: { order },
  });
};

// @desc Get orders by user ID
// @route GET /api/orders/user/:userId
// @access Public
const getOrdersByUserId = async (req, res) => {
  const orders = await orderService.getOrdersByUserId(req.params.userId);
  res.status(200).json({
    status: httpStatusText.SUCCESS,
    message: "Orders retrieved successfully",
    data: { orders },
  });
};

// @desc Update an order
// @route PUT /api/orders/:id
// @access Admin
const updateOrder = async (req, res) => {
  const order = await orderService.updateOrder(req.params.id, {
    status: req.body.status,
  });
  res.status(200).json({
    status: httpStatusText.SUCCESS,
    message: "Order updated successfully",
    data: { order },
  });
};

// @desc Delete an order
// @route DELETE /api/orders/:id
// @access Admin
const deleteOrder = async (req, res) => {
  await orderService.deleteOrder(req.params.id);
  res.status(200).json({
    status: httpStatusText.SUCCESS,
    message: "Order deleted successfully",
    data: null,
  });
};

module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  getOrdersByUserId,
  updateOrder,
  deleteOrder,
};
