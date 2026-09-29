import AppError from "../errors/app-error.js";
import Order from "../models/order.model.js";
import { OrderItem } from "../models/order-items.model.js";
import Product from "../models/product.model.js";

const orderTransitions = {
	pending: ["confirmed", "cancelled"],
	confirmed: ["shipped", "cancelled"],
	shipped: ["delivered"],
	delivered: [],
	cancelled: [],
};

const aggregateItemsByProduct = (items) => {
	const quantities = new Map();
	for (const item of items) {
		const productId = String(item.productId);
		quantities.set(productId, (quantities.get(productId) ?? 0) + item.quantity);
	}
	return quantities;
};

const restoreInventory = async (items) => {
	const quantities = aggregateItemsByProduct(items);
	const restored = [];
	try {
		for (const [productId, quantity] of quantities) {
			await Product.updateOne({ _id: productId }, { $inc: { stock: quantity } });
			restored.push({ productId, quantity });
		}
	} catch (error) {
		await Promise.all(
			restored.map(({ productId, quantity }) =>
				Product.updateOne({ _id: productId }, { $inc: { stock: -quantity } }),
			),
		);
		throw error;
	}
};

const attachItems = async (orders) => {
	if (orders.length === 0) return [];
	const orderIds = orders.map((order) => order._id);
	const items = await OrderItem.find({ orderId: { $in: orderIds } })
		.populate({ path: "productId", select: "name price" })
		.lean();
	const itemsByOrder = new Map(orderIds.map((id) => [String(id), []]));
	for (const item of items) {
		itemsByOrder.get(String(item.orderId))?.push(item);
	}
	return orders.map((order) => {
		const orderItems = itemsByOrder.get(String(order._id)) ?? [];
		return {
			...order,
			items: orderItems,
			totalItems: orderItems.reduce((total, item) => total + item.quantity, 0),
		};
	});
};

const getAllOrders = async () => attachItems(await Order.find().sort({ createdAt: -1 }).lean());

const getOrderById = async (id) => {
	const order = await Order.findById(id).lean();
	if (!order) {
		throw new AppError("Order not found", 404);
	}
	return (await attachItems([order]))[0];
};

const createOrder = async (orderData) => {
	const requestedQuantities = aggregateItemsByProduct(orderData.items);
	const products = await Product.find({ _id: { $in: [...requestedQuantities.keys()] } }).lean();
	const productsById = new Map(products.map((product) => [String(product._id), product]));
	for (const productId of requestedQuantities.keys()) {
		if (!productsById.has(productId)) {
			throw new AppError("Product not found", 404);
		}
	}

	const reserved = [];
	let order;
	try {
		for (const [productId, quantity] of requestedQuantities) {
			const result = await Product.updateOne(
				{ _id: productId, stock: { $gte: quantity } },
				{ $inc: { stock: -quantity } },
			);
			if (result.modifiedCount !== 1) {
				throw new AppError(`Insufficient stock for product ${productId}`, 409);
			}
			reserved.push({ productId, quantity });
		}

		const totalAmount = orderData.items.reduce((total, item) => {
			const product = productsById.get(String(item.productId));
			return total + product.price * item.quantity;
		}, 0);
		order = await new Order({ userId: orderData.userId, totalAmount }).save();
		await OrderItem.insertMany(
			orderData.items.map((item) => ({
				...item,
				orderId: order._id,
				unitPrice: productsById.get(String(item.productId)).price,
			})),
		);
	} catch (error) {
		if (order) {
			await Promise.all([
				OrderItem.deleteMany({ orderId: order._id }),
				Order.deleteOne({ _id: order._id }),
			]);
		}
		await Promise.all(
			reserved.map(({ productId, quantity }) =>
				Product.updateOne({ _id: productId }, { $inc: { stock: quantity } }),
			),
		);
		throw error;
	}

	return getOrderById(order._id);
};

const updateOrder = async (id, orderData) => {
	const currentOrder = await Order.findById(id).lean();
	if (!currentOrder) {
		throw new AppError("Order not found", 404);
	}
	if (
		currentOrder.status !== orderData.status &&
		!orderTransitions[currentOrder.status].includes(orderData.status)
	) {
		throw new AppError(`Cannot transition order from ${currentOrder.status} to ${orderData.status}`, 409);
	}

	if (orderData.status === "cancelled" && !currentOrder.inventoryRestocked) {
		const items = await OrderItem.find({ orderId: currentOrder._id }).lean();
		const claimed = await Order.findOneAndUpdate(
			{ _id: id, status: currentOrder.status, inventoryRestocked: false },
			{ $set: { status: "cancelled", inventoryRestocked: true } },
			{ returnDocument: "after", runValidators: true },
		).lean();
		if (!claimed) {
			throw new AppError("Order status changed; reload and retry", 409);
		}
		try {
			await restoreInventory(items);
		} catch (error) {
			await Order.updateOne(
				{ _id: id, inventoryRestocked: true },
				{ $set: { status: currentOrder.status, inventoryRestocked: false } },
			);
			throw error;
		}
		return getOrderById(id);
	}

	const order = await Order.findOneAndUpdate(
		{ _id: id, status: currentOrder.status, inventoryRestocked: currentOrder.inventoryRestocked },
		{ $set: orderData },
		{ returnDocument: "after", runValidators: true },
	).lean();
	if (!order) {
		throw new AppError("Order status changed; reload and retry", 409);
	}
	return order;
};

const deleteOrder = async (id) => {
	let order = await Order.findById(id).lean();
	if (!order) {
		throw new AppError("Order not found", 404);
	}
	if (!["pending", "cancelled"].includes(order.status)) {
		throw new AppError("Only pending or cancelled orders can be deleted", 409);
	}
	if (order.status === "pending") {
		await updateOrder(id, { status: "cancelled" });
	}
	await OrderItem.deleteMany({ orderId: id });
	order = await Order.findByIdAndDelete(id).lean();
	return order;
};

export { createOrder, deleteOrder, getAllOrders, getOrderById, updateOrder };