const orderController = require("../controllers/orderController");

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await orderController.findAll();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getOneOrderByLoggedUser = async (req, res) => {
  try {
    const orderItems = await orderController.findItemsByOrderId(req.params.orderId);

    if (!orderItems) {
      return res.status(404).json({ message: "order not found" });
    }

    res.status(200).json(orderItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllOrdersByLoggedUser = async (req, res) => {
  try {
    const id = req.params.id;
    const orders = await orderController.findByUserId(id);
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createOrder = async (req, res) => {
  try {
    const cart = await orderController.findCartByUserId(req.user.id);
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const cartItems = await orderController.findCartItems(cart._id);
    if (cartItems.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const hasInvalidItem = cartItems.some(
      (item) => !item.productId || !Number.isInteger(item.quantity) || item.quantity < 1,
    );
    if (hasInvalidItem) {
      return res.status(400).json({ message: "Cart contains invalid items" });
    }

    const order = await orderController.create({ userId: req.user.id });
    const orderItems = await orderController.createItems(
      cartItems.map((item) => ({
        orderId: order._id,
        productId: item.productId._id,
        quantity: item.quantity,
        color: item.color,
        size: item.size,
        price: item.productId.price,
      })),
    );

    await orderController.clearCart(cart._id);

    res.status(201).json({ order, items: orderItems });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const id = req.params.id;
    const { status } = req.body;
    const order = await orderController.updateStatus(id, status);
    if (!order) {
      return res.status(404).json({ message: "order not found" });
    }
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.softDeleteOrder = async (req, res) => {
  try {
    const id = req.params.id;

    const order = await orderController.softDelete(id);
    if (!order) {
      return res.status(404).json({ message: "order not found" });
    }
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
