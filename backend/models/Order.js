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
      enum: ["pending", "approved", "rejected", "active", "returned", "cancelled"], // Added new statuses
      default: "pending",
    },
    deliverySlot: {
      type: String, 
      required: true, 
    },
    address: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    paymentMethod: {
      type: String,
      default: "COD",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
