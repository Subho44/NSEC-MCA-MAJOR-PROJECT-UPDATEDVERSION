const Order = require("../models/Order");
const Cart = require("../models/Cart");

exports.placeOrder = async (req, res) => {
  try {
    const { userId, paymentMethod } = req.body;

    const cart = await Cart.findOne({ userId });

    if (!cart || cart.courses.length === 0) {
      return res.status(400).json({ message: "Cart empty" });
    }

    const total = cart.courses.reduce((sum, item) => sum + item.price, 0);

    const order = await Order.create({
      userId,
      items: cart.courses,
      total,
      paymentMethod,
      status: "Completed",
    });

    await Cart.findOneAndDelete({ userId });

    res.status(200).json({
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    res.status(500).json({ message: "Place order failed", error: error.message });
  }
};