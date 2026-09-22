const Cart = require("../models/cartModel");
const CartItems = require("../models/cartItemsModel");

exports.findAll = () => Cart.find().populate("userId");
exports.findByUserId = (userId) => Cart.findOne({ userId });
exports.create = (data) => Cart.create(data);

exports.findItems = (cartId) =>
  CartItems.find({ cartId }).populate("productId");

exports.upsertItem = (query, quantity) =>
  CartItems.findOneAndUpdate(
    query,
    { $inc: { quantity }, $setOnInsert: { ...query, quantity } },
    { new: true, upsert: true, runValidators: true },
  );

exports.deleteItem = ({ id, productId }) => {
  return CartItems.findOneAndUpdate(
    { _id: id },
    { $pull: { items: { productId } } },
    { new: true },
  );
};

exports.updateItem = (id, productId, quantity) =>
  CartItems.findOneAndUpdate(
    { id, productId },
    { quantity },
    { new: true, runValidators: true },
  );
