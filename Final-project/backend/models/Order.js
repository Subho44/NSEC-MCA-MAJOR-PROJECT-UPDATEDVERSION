const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: String,
    items: Array,
    total: Number,
    paymentMethod: {
      type: String,
      default: "COD",
    },
    status: {
      type: String,
      default: "Completed",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);