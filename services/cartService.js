const cartController = require("../controllers/cartController");

exports.getAllCarts = async (req, res) => {
  try {
    const carts = await cartController.findAll();
    const cartsWithItems = await Promise.all(carts.map(cartController.getWithItems));
    res.status(200).json(cartsWithItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getOneCartByLoggedUser = async (req, res) => {
  try {
    const cart = await cartController.findByUserId(req.params.id);
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    res.status(200).json(await cartController.getWithItems(cart));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addProduct = async (req, res) => {
  try {
    const { productId, quantity = 1, color, size } = req.body;
    if (!productId || !Number.isInteger(quantity) || quantity < 1) {
      return res.status(400).json({
        message: "productId and a positive integer quantity are required",
      });
    }

    let cart = await cartController.findByUserId(req.user.id);
    if (!cart) {
      cart = await cartController.create({ userId: req.user.id });
    }

    const query = { cartId: cart._id, productId };
    if (color) query.color = color;
    if (size) query.size = size;

    await cartController.upsertItem(query, quantity);

    res.status(200).json(await cartController.getWithItems(cart));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.removeProduct = async (req, res) => {
  try {
    const { productId } = req.body;
    const cart = await cartController.findByUserId(req.user.id);
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    const item = await cartController.deleteItem({
      cartId: cart._id,
      productId,
    });
    if (!item) {
      return res.status(404).json({ message: "Product not found in cart" });
    }
    res.status(200).json(await cartController.getWithItems(cart));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.changeProductQuantity = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    if (!productId || !Number.isInteger(quantity) || quantity < 1) {
      return res.status(400).json({
        message: "productId and a positive integer quantity are required",
      });
    }

    const cart = await cartController.findByUserId(req.user.id);
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    const item = await cartController.updateItem({ cartId: cart._id, productId }, quantity);
    if (!item) {
      return res.status(404).json({ message: "Product not found in cart" });
    }
    res.status(200).json(await cartController.getWithItems(cart));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
