const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    items: { type: Array, default: [] },
    total: { type: Number, default: 0 },
    paymentMethod: { type: String, default: "COD" },
    status: { type: String, default: "Completed" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
