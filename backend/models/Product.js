const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    pricing: [
      {
        tenure: { type: String, required: true }, // e.g., "1 Day", "3 Days"
        price: { type: Number, required: true },
      },
    ],

    available: {
      type: Boolean,
      default: true,
    },
    image: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
