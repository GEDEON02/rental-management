const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    rentType: {
      type: String,
      enum: ["day", "week"],
      required: true,
    },

    duration: {
      type: Number,
      required: true,
    },

    totalAmount: {
      type: Number,
      required: true,
    },

    startDate: {
      type: Date,
      default: Date.now,
    },

    status: {
      type: String,
      enum: ["active", "returned"],
      default: "active",
    },
    deliverySlot: {
      type: String, 
      required: true, // e.g. "Today, 2PM - 4PM"
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
