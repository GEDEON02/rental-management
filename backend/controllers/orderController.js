const Order = require("../models/Order");

// CREATE ORDER
exports.createOrder = async (req, res) => {
  try {
    const { product, rentType, duration, totalAmount, deliverySlot, address, phone } = req.body;

    const order = await Order.create({
      user: req.user.id,
      product,
      rentType,
      duration,
      totalAmount,
      deliverySlot,
      address,
      phone,
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
    ).sort({ createdAt: -1 }); // Sorted by newest
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
      .populate("product", "name")
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE ORDER STATUS (ADMIN)
exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
