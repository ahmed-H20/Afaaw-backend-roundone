import * as orderService from "../services/order.service.js";

const getAllOrders = async (req, res) => {
	const orders = await orderService.getAllOrders(req.auth.id, req.auth.role === "admin");
	res.json(orders);
};

const getOrderById = async (req, res) => {
	const order = await orderService.getOrderById(req.validated.params.id);
	res.json(order);
};

const createOrder = async (req, res) => {
	const order = await orderService.createOrder({ ...req.validated.body, userId: req.auth.id });
	res.status(201).json(order);
};

const updateOrder = async (req, res) => {
	const order = await orderService.updateOrder(req.validated.params.id, req.validated.body);
	res.json(order);
};

const deleteOrder = async (req, res) => {
	const order = await orderService.deleteOrder(req.validated.params.id);
	res.json({ message: "Order deleted successfully", order });
};

export { createOrder, deleteOrder, getAllOrders, getOrderById, updateOrder };