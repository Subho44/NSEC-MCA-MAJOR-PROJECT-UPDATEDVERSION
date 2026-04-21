const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    userId: String,
    courses: [
      {
        courseId: String,
        title: String,
        price: Number,
        image: String,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", cartSchema);