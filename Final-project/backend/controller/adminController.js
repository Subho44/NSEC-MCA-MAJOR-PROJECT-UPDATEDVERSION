const User = require("../models/User");
const Course = require("../models/Course");
const Order = require("../models/Order");

exports.getDashboardData = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalCourses = await Course.countDocuments();
    const totalOrders = await Order.countDocuments();

    res.status(200).json({
      totalUsers,
      totalCourses,
      totalOrders,
    });
  } catch (error) {
    res.status(500).json({ message: "Admin dashboard failed", error: error.message });
  }
};