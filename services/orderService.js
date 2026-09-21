const Order = require("../models/orderModel");

// @desc Create a new order
// @route POST /api/orders
// @access Public
const createOrder = async (req, res, next) => {
  try {
    const order = await Order.create(req.body);
    res.status(201).json({ message: "Order created successfully ✅", order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating order❌" });
  }
};

// desc Get all orders
// @route GET /api/orders
// @access Public
const getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find();
    res.status(200).json({ message: "Orders fetched successfully ✅", orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching orders❌" });
  }
};

// desc Get an order by id
// @route GET /api/orders/:id
// @access Public
const getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);
    res.status(200).json({ message: "Order fetched successfully ✅", order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching order❌" });
  }
};

// desc Update an order
// @route PUT /api/orders/:id
// @access Public
const updateOrder = async (req, res, next) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({ message: "Order updated successfully ✅", order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating order❌" });
  }
};

// desc Delete an order
// @route DELETE /api/orders/:id
// @access Public
const deleteOrder = async (req, res, next) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Order deleted successfully ✅", order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting order❌" });
  }
};

module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
};
