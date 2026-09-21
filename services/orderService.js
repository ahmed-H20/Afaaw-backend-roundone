const Order = require("../models/orderModel");
const OrderItems = require("../models/productItemsModel");

// @desc Create a new order
// @route POST /api/orders
// @access User
const createOrder = async (req, res) => {
    try {
        const { userId, items, status, date } = req.body;
        if (!userId) return res.status(400).json({ message: "userId is required" });
        const order = await Order.create({ userId, status, date });

        if (Array.isArray(items) && items.length) {
            const orderItems = items.map((it) => ({
                productId: it.productId,
                quantity: it.quantity || 1,
                color: it.color,
                size: it.size,
                orderId: order._id,
                price: it.price,
            }));
            await OrderItems.insertMany(orderItems);
        }

        res.status(201).json({ message: "Order created", orderId: order._id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error creating order" });
    }
};

// @desc Get order by id with items
// @route GET /api/orders/:id
// @access User/Admin
const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) return res.status(404).json({ message: "Order not found" });
        const items = await OrderItems.find({ orderId: order._id }).populate("productId");
        res.status(200).json({ order, items });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching order" });
    }
};

// @desc Update order status
// @route PUT /api/orders/:id/status
// @access Admin
const updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
        if (!order) return res.status(404).json({ message: "Order not found" });
        res.status(200).json({ message: "Order updated", order });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating order" });
    }
};

module.exports = { createOrder, getOrderById, updateOrderStatus };
