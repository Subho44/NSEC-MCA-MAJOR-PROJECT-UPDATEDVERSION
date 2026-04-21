const Cart = require("../models/Cart");

exports.addToCart = async (req, res) => {
  try {
    const { userId, course } = req.body;

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = await Cart.create({
        userId,
        courses: [course],
      });
    } else {
      cart.courses.push(course);
      await cart.save();
    }

    res.status(200).json({ message: "Added to cart", cart });
  } catch (error) {
    res.status(500).json({ message: "Add to cart failed", error: error.message });
  }
};

exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.id });
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: "Cart fetch failed", error: error.message });
  }
};