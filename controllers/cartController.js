const asyncHandler = require("express-async-handler");
const service = require("../services/cartService");
exports.getAllCarts = asyncHandler(async (req, res) =>
  res.status(200).json(await service.getAllCarts()),
);
exports.getCartItems = asyncHandler(async (req, res) =>
  res.status(200).json(await service.getCartItems(req.params.cartId)),
);
exports.getOneCartByUser = asyncHandler(async (req, res) =>
  res.status(200).json(await service.getOneCartByUser(req.params.userId)),
);
exports.addProduct = asyncHandler(async (req, res) =>
  res
    .status(200)
    .json(await service.addProduct({ ...req.body, userId: req.user.id })),
);
exports.removeProduct = asyncHandler(async (req, res) =>
  res.status(200).json(await service.removeProduct(req.body)),
);
exports.changeProductQuantity = asyncHandler(async (req, res) =>
  res.status(200).json(await service.changeProductQuantity(req.body)),
);
