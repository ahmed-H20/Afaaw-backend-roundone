const orderService = require("../services/order.service");

// @desc Create a new order
// @route POST /api/orders
// @access Public
const createOrder = async (req, res) => {
  try {
    const order = await orderService.createOrder(req.body);

    res.status(201).json({
      message: "Order created successfully",
      order,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error creating order",
    });
  }
};

// @desc Get all orders
// @route GET /api/orders
// @access Admin
const getAllOrders = async (req, res) => {
  try {
    const orders = await orderService.getAllOrders();

    res.status(200).json({
      orders,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error fetching orders",
    });
  }
};

// @desc Get order by ID
// @route GET /api/orders/:id
// @access Public
const getOrderById = async (req, res) => {
  try {
    const order = await orderService.getOrderById(req.params.id);

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    res.status(200).json({
      order,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error fetching order",
    });
  }
};

// @desc Get orders by user ID
// @route GET /api/orders/user/:userId
// @access Public
const getOrdersByUserId = async (req, res) => {
  try {
    const orders = await orderService.getOrdersByUserId(
      req.params.userId
    );

    res.status(200).json({
      orders,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error fetching user orders",
    });
  }
};

// @desc Update an order
// @route PUT /api/orders/:id
// @access Admin
const updateOrder = async (req, res) => {
  try {
    const order = await orderService.updateOrder(
      req.params.id,
      {status: req.body.status}
    );

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    res.status(200).json({
      message: "Order updated successfully",
      order,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error updating order",
    });
  }
};

// @desc Delete an order
// @route DELETE /api/orders/:id
// @access Admin
const deleteOrder = async (req, res) => {
  try {
    const order = await orderService.deleteOrder(req.params.id);

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    res.status(200).json({
      message: "Order deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error deleting order",
    });
  }
};

module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  getOrdersByUserId,
  updateOrder,
  deleteOrder,
};