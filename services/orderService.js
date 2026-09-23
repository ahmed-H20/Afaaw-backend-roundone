const Order = require("../models/orderModel");
const AppError = require("../errors/AppError");

// @desc Create a new order
// @route POST /api/orders
// @access User
const createOrder = async (req, res, next) => {
  try {
    const order = await Order.create(req.body);

    res.status(201).json({
      message: "Order created successfully",
      order,
    });
  } catch (error) {
    next(error);
  }
};

// @desc Get all orders
// @route GET /api/orders
// @access Admin
const getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find();

    res.status(200).json({ orders });
  } catch (error) {
    next(error);
  }
};

// @desc Get an order by ID
// @route GET /api/orders/:id
// @access User / Admin
const getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return next(new AppError("Order not found", 404));
    }

    res.status(200).json({ order });
  } catch (error) {
    next(error);
  }
};

// @desc Get orders by User ID
// @route GET /api/orders/user/:userId
// @access User / Admin
const getOrdersByUserId = async (req, res, next) => {
  try {
    const orders = await Order.find({
      userId: req.params.userId,
    });

    res.status(200).json({ orders });
  } catch (error) {
    next(error);
  }
};

// @desc Update an order
// @route PUT /api/orders/:id
// @access Admin
const updateOrder = async (req, res, next) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    if (!order) {
      return next(new AppError("Order not found", 404));
    }

    res.status(200).json({
      message: "Order updated successfully",
      order,
    });
  } catch (error) {
    next(error);
  }
};

// @desc Delete an order
// @route DELETE /api/orders/:id
// @access Admin
const deleteOrder = async (req, res, next) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);

    if (!order) {
      return next(new AppError("Order not found", 404));
    }

    res.status(200).json({
      message: "Order deleted successfully",
    });
  } catch (error) {
    next(error);
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