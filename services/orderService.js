const Order = require("../models/orderModel");
const OrderItem = require("../models/orderItemsModel");
const Cart = require("../models/cartModel");
const CartItem = require("../models/cartItemsModel");
const Product = require("../models/productsModel");

// Helper to build an error the controller can turn into a status code
const httpError = (message, statusCode) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

// Which statuses each status is allowed to move to.
const STATUS_TRANSITIONS = {
  pending: ["confirmed", "cancelled"],
  confirmed: ["shipped", "cancelled"],
  shipped: ["delivered"],
  delivered: [],
  cancelled: [],
};

// Put stock back for a list of { productId, quantity }
const restock = async (lines) => {
  await Promise.all(
    lines.map((line) =>
      Product.updateOne(
        { _id: line.productId },
        { $inc: { stock: line.quantity } },
      ),
    ),
  );
};

// Turn the user's cart into an order
const createOrder = async (userId) => {
  const cart = await Cart.findOne({ userId });
  const cartItems = cart
    ? await CartItem.find({ cartId: cart._id }).populate("productId")
    : [];

  if (cartItems.length === 0) {
    throw httpError("Cart is empty", 400);
  }

  const missing = cartItems.find((item) => !item.productId);
  if (missing) {
    throw httpError("A product in your cart is no longer available", 400);
  }

  // Reserve stock one line at a time. The { stock: { $gte } } condition makes
  // each check-and-decrement a single atomic step, so two users can't both buy
  // the last unit. If any line fails, give back what was already taken.
  const reserved = [];
  for (const item of cartItems) {
    const product = await Product.findOneAndUpdate(
      { _id: item.productId._id, stock: { $gte: item.quantity } },
      { $inc: { stock: -item.quantity } },
    );

    if (!product) {
      await restock(reserved);
      throw httpError(`Not enough stock for ${item.productId.name}`, 400);
    }

    reserved.push({ productId: item.productId._id, quantity: item.quantity });
  }

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.productId.price * item.quantity,
    0,
  );

  let order;
  try {
    order = await Order.create({ userId, totalPrice });

    // Snapshot name and price so the order never changes after checkout.
    const items = await OrderItem.insertMany(
      cartItems.map((item) => ({
        orderId: order._id,
        productId: item.productId._id,
        name: item.productId.name,
        price: item.productId.price,
        quantity: item.quantity,
        color: item.color,
        size: item.size,
      })),
    );

    await CartItem.deleteMany({ cartId: cart._id });

    return { order, items };
  } catch (error) {
    // Undo the partial checkout so stock and orders stay consistent.
    await restock(reserved);
    if (order) {
      await OrderItem.deleteMany({ orderId: order._id });
      await order.deleteOne();
    }
    throw error;
  }
};

// Get all orders for a user, newest first
const getUserOrders = async (userId) => {
  return await Order.find({ userId }).sort({ createdAt: -1 });
};

// Get one of a user's orders with its items
const getOrderById = async (userId, orderId) => {
  // Scoped to userId so one user can't read another user's order.
  const order = await Order.findOne({ _id: orderId, userId });
  if (!order) {
    throw httpError("Order not found", 404);
  }

  const items = await OrderItem.find({ orderId: order._id });
  return { order, items };
};

// Get every order (admin)
const getAllOrders = async () => {
  return await Order.find().sort({ createdAt: -1 });
};

// Move an order to a new status, following STATUS_TRANSITIONS.
// Pass userId to restrict the change to that user's own order.
const changeStatus = async (orderId, newStatus, userId) => {
  if (!STATUS_TRANSITIONS[newStatus]) {
    throw httpError(`Invalid status: ${newStatus}`, 400);
  }

  const allowedFrom = Object.keys(STATUS_TRANSITIONS).filter((status) =>
    STATUS_TRANSITIONS[status].includes(newStatus),
  );

  const filter = { _id: orderId, status: { $in: allowedFrom } };
  if (userId) {
    filter.userId = userId;
  }

  // Checking and updating the status in one query means two cancel requests
  // can't both succeed and restock the same items twice.
  const order = await Order.findOneAndUpdate(
    filter,
    { status: newStatus },
    { new: true },
  );

  if (!order) {
    const existing = await Order.findOne(
      userId ? { _id: orderId, userId } : { _id: orderId },
    );
    if (!existing) {
      throw httpError("Order not found", 404);
    }
    throw httpError(
      `Cannot change order from ${existing.status} to ${newStatus}`,
      400,
    );
  }

  if (newStatus === "cancelled") {
    const items = await OrderItem.find({ orderId: order._id });
    await restock(items);
  }

  return order;
};

// Cancel one of a user's own orders
const cancelOrder = async (userId, orderId) => {
  return await changeStatus(orderId, "cancelled", userId);
};

// Update any order's status (admin)
const updateOrderStatus = async (orderId, status) => {
  return await changeStatus(orderId, status);
};

module.exports = {
  createOrder,
  getUserOrders,
  getOrderById,
  getAllOrders,
  cancelOrder,
  updateOrderStatus,
};
