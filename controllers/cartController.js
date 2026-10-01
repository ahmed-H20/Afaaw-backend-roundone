const service = require("../services/cartService");

exports.getAllCarts = async (req, res) =>
  res.status(200).json(await service.getAllCarts());
exports.getCartItems = async (req, res) =>
  res.status(200).json(await service.getCartItems(req.params.cartId));
exports.getOneCartByUser = async (req, res) =>
  res.status(200).json(await service.getOneCartByUser(req.params.userId));
exports.addProduct = async (req, res) =>
  res
    .status(200)
    .json(await service.addProduct({ ...req.body, userId: req.user.id }));
exports.removeProduct = async (req, res) =>
  res.status(200).json(await service.removeProduct(req.body));
exports.changeProductQuantity = async (req, res) =>
  res.status(200).json(await service.changeProductQuantity(req.body));
