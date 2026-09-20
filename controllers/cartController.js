const Cart = require("../models/cartModel");
const CartItems = require("../models/cartItemsModel");

exports.findAll = () => Cart.find().populate("userId");
exports.findByUserId = (userId) => Cart.findOne({ userId });
exports.create = (data) => Cart.create(data);
exports.findItems = (cartId) => CartItems.find({ cartId }).populate("productId");
exports.getWithItems = async (cart) => ({ ...cart.toObject(), items: await exports.findItems(cart._id) });
exports.upsertItem = (query, quantity) => CartItems.findOneAndUpdate(
  query,
  { $inc: { quantity }, $setOnInsert: { ...query, quantity } },
  { new: true, upsert: true, runValidators: true },
);
exports.deleteItem = (query) => CartItems.findOneAndDelete(query);
exports.updateItem = (query, quantity) => CartItems.findOneAndUpdate(
  query,
  { quantity },
  { new: true, runValidators: true },
);
