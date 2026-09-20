const Order = require('../models/orderModel');
const OrderItem = require('../models/orderItemsModel');

// @desc Create new order with items
// @route POST /api/orders
// @access Private
const createOrder = async (req, res, next) => {
	try {
		const { user_id, items, status } = req.body;

		if (!user_id || !items || items.length === 0) {
			return res
				.status(400)
				.json({ message: 'user_id and at least one order item are required' });
		}

		const order = await Order.create({
			user_id,
			date: new Date(),
			status: status || 'pending',
		});

		const orderItemsData = items.map((item) => ({
			...item,
			order_id: order._id,
		}));
		const orderItems = await OrderItem.insertMany(orderItemsData);

		res
			.status(201)
			.json({ message: 'Order created successfully', order, orderItems });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Error creating order' });
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
		console.error(error);
		res.status(500).json({ message: 'Error fetching orders' });
	}
};

// @desc Get order details by ID
// @route GET /api/orders/:id
// @access Private
const getOrderById = async (req, res, next) => {
	try {
		const order = await Order.findById(req.params.id);
		if (!order) {
			return res.status(404).json({ message: 'Order not found' });
		}
		const orderItems = await OrderItem.find({ order_id: order._id });
		res.status(200).json({ order, orderItems });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Error fetching order' });
	}
};

// @desc Update order status (pending, confirmed, shipped, delivered, cancelled)
// @route PUT /api/orders/:id/status
// @access Admin
const updateOrderStatus = async (req, res, next) => {
	try {
		const { status } = req.body;
		if (!status) {
			return res.status(400).json({ message: 'Status is required' });
		}
		const order = await Order.findByIdAndUpdate(
			req.params.id,
			{ status },
			{ new: true },
		);
		if (!order) {
			return res.status(404).json({ message: 'Order not found' });
		}
		res.status(200).json({ message: 'Order status updated', order });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Error updating order status' });
	}
};

module.exports = {
	createOrder,
	getAllOrders,
	getOrderById,
	updateOrderStatus,
};
