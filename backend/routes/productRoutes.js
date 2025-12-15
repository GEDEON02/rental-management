const express = require("express");
const router = express.Router();

const {
  addProduct,
  getProducts,
  getProductById,
} = require("../controllers/productController");

router.post("/", addProduct);          // admin
router.get("/", getProducts);           // user
router.get("/:id", getProductById);     // details

module.exports = router;
