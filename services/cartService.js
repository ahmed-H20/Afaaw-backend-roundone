const cartController = require("../controllers/cartController");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/ApiError");

exports.getAllCarts = asyncHandler(async (req, res) => {
  const carts = await cartController.findAll();
  res.status(200).json(carts);
});

exports.getCartItems = asyncHandler(async (req, res) => {
  const cartItems = await cartController.findItems(req.params.cartId);
  res.status(200).json(cartItems);
});

exports.getOneCartByUser = asyncHandler(async (req, res) => {
  const cart = await cartController.findByUserId(req.params.userId);
  if (!cart) {
    throw new ApiError("Cart not found", 404);
  }
  res.status(200).json(await cartController.findItems(cart._id));
});

exports.addProduct = asyncHandler(async (req, res) => {
  const { productId, quantity = 1, color, size } = req.body;

  let cart = await cartController.findByUserId(req.user.id);
  if (!cart) {
    cart = await cartController.create({ userId: req.user.id });
  }

  const query = { cartId: cart._id, productId };
  if (color) query.color = color;
  if (size) query.size = size;

  const createCart = await cartController.upsertItem(query, quantity);

  res.status(200).json(createCart);
});

exports.removeProduct = asyncHandler(async (req, res) => {
  const { productId, id } = req.body;

  const updatedCart = await cartController.deleteItem({
    id,
    productId,
  });
  if (!updatedCart) {
    throw new ApiError("Product not found in cart", 404);
  }
  res.status(200).json(updatedCart);
});

exports.changeProductQuantity = asyncHandler(async (req, res) => {
  const { productId, quantity, id } = req.body;

  const updatedCart = await cartController.updateItem(id, productId, quantity);
  if (!updatedCart) {
    throw new ApiError("Product not found in cart", 404);
  }
  res.status(200).json(updatedCart);
});
