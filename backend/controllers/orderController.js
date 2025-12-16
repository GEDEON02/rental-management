const Order = require("../models/Order");

// CREATE ORDER
exports.createOrder = async (req, res) => {
  try {
    const { product, rentType, duration, totalAmount, deliverySlot } = req.body;

    const order = await Order.create({
      user: req.user.id,
      product,
      rentType,
      duration,
      totalAmount,
      deliverySlot,
    });

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET MY ORDERS
exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).populate(
      "product",
      "name rentPerDay rentPerWeek"
    );
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL ORDERS (ADMIN)
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .populate("product", "name");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
