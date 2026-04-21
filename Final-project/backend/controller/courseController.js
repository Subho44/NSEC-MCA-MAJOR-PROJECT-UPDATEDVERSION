const Course = require("../models/Course");
const jwt = require("jsonwebtoken");

exports.addcourse = async (req, res) => {
  try {
    const token = req.headers.authorization;
    if (!token) return res.status(401).json({ message: "Please login first" });

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      return res.status(401).json({ message: "Invalid token" });
    }

    const { title, instructor, price, duration, category, description } = req.body;
    const images = req.files ? req.files.map((file) => file.filename) : [];

    const course = await Course.create({
      title,
      instructor,
      price,
      duration,
      category,
      description,
      images,
      user: decoded.id,
    });

    res.status(201).json({ message: "Course added successfully", course });
  } catch (error) {
    res.status(500).json({ message: "Add course failed", error: error.message });
  }
};

exports.viewcourse = async (req, res) => {
  try {
    const courses = await Course.find().sort({ createdAt: -1 });
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: "Fetch failed", error: error.message });
  }
};

exports.singelcourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ message: "Single fetch failed", error: error.message });
  }
};

exports.searchcourse = async (req, res) => {
  try {
    const keyword = req.params.keyword;
    const courses = await Course.find({ title: { $regex: keyword, $options: "i" } });
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: "Search failed", error: error.message });
  }
};

exports.deletecourse = async (req, res) => {
  try {
    await Course.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Course deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Delete failed", error: error.message });
  }
};
