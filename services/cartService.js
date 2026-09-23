const Cart = require("../models/cartModel");
const CartItems = require("../models/cartItemsModel");
const ApiError = require("../utils/ApiError");

exports.getAllCarts = () => Cart.find().populate("userId");
exports.getCartItems = (cartId) =>
  CartItems.find({ cartId }).populate("productId");
exports.getOneCartByUser = async (userId) => {
  const cart = await Cart.findOne({ userId });
  if (!cart) throw new ApiError("Cart not found", 404);
  return CartItems.find({ cartId: cart._id }).populate("productId");
};
exports.addProduct = async ({
  userId,
  productId,
  quantity = 1,
  color,
  size,
}) => {
  let cart = await Cart.findOne({ userId });
  if (!cart) cart = await Cart.create({ userId });
  const query = { cartId: cart._id, productId };
  if (color) query.color = color;
  if (size) query.size = size;
  return CartItems.findOneAndUpdate(
    query,
    { $inc: { quantity }, $setOnInsert: { ...query, quantity } },
    { new: true, upsert: true, runValidators: true },
  );
};
exports.removeProduct = async ({ productId, id }) => {
  const item = await CartItems.findOneAndDelete({ _id: id, productId });
  if (!item) throw new ApiError("Product not found in cart", 404);
  return item;
};
exports.changeProductQuantity = async ({ productId, quantity, id }) => {
  const item = await CartItems.findOneAndUpdate(
    { _id: id, productId },
    { quantity },
    { new: true, runValidators: true },
  );
  if (!item) throw new ApiError("Product not found in cart", 404);
  return item;
};
