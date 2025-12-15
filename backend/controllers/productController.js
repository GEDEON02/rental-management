const Product = require("../models/Product");

// ADD PRODUCT (ADMIN)
exports.addProduct = async (req, res) => {
  try {
    const { name, description, rentPerDay, rentPerWeek } = req.body;

    const product = await Product.create({
      name,
      description,
      rentPerDay,
      rentPerWeek,
    });

    res.status(201).json({
      message: "Product added successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL PRODUCTS (USER)
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find({ available: true });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET SINGLE PRODUCT (DETAILS)
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
