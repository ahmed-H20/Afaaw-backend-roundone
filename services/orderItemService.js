const OrderItem = require("../models/orderItemsModel");

// @desc Create a new order item
// @route POST /api/order-items
// @access Public
const createOrderItem = async (req, res, next) => {
  try {
    const orderItem = await OrderItem.create(req.body);
    res
      .status(201)
      .json({ message: "Order item created successfully ✅", orderItem });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating order item❌" });
  }
};

// desc Get all order items
// @route GET /api/order-items
// @access Public
const getAllOrderItems = async (req, res, next) => {
  try {
    const orderItems = await OrderItem.find();
    res
      .status(200)
      .json({ message: "Order items fetched successfully ✅", orderItems });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching order items❌" });
  }
};

// desc Get an order item by id
// @route GET /api/order-items/:id
// @access Public
const getOrderItemById = async (req, res, next) => {
  try {
    const orderItem = await OrderItem.findById(req.params.id);
    res
      .status(200)
      .json({ message: "Order item fetched successfully ✅", orderItem });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching order item❌" });
  }
};

// desc Update an order item
// @route PUT /api/order-items/:id
// @access Public
const updateOrderItem = async (req, res, next) => {
  try {
    const orderItem = await OrderItem.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    res
      .status(200)
      .json({ message: "Order item updated successfully ✅", orderItem });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating order item❌" });
  }
};

// desc Delete an order item
// @route DELETE /api/order-items/:id
// @access Public
const deleteOrderItem = async (req, res, next) => {
  try {
    const orderItem = await OrderItem.findByIdAndDelete(req.params.id);
    res
      .status(200)
      .json({ message: "Order item deleted successfully ✅", orderItem });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting order item❌" });
  }
};

module.exports = {
  createOrderItem,
  getAllOrderItems,
  getOrderItemById,
  updateOrderItem,
  deleteOrderItem,
};
