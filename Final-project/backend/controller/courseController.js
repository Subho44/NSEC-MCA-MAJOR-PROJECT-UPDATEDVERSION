const Course = require("../models/Course");
const jwt = require("jsonwebtoken");

exports.addCourse = async (req, res) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: "Please login first" });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      return res.status(401).json({ message: "Invalid token" });
    }

    if (decoded.role !== "admin" && decoded.role !== "instructor") {
      return res.status(403).json({ message: "Only admin or instructor can add course" });
    }

    const { title, instructor, price, duration, category, description } =
      req.body;

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
      createdByRole: decoded.role,
    });

    res.status(201).json({ message: "Course added successfully", course });
  } catch (error) {
    res.status(500).json({ message: "Add course failed", error: error.message });
  }
};

exports.updateCourse = async (req, res) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: "Please login first" });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      return res.status(401).json({ message: "Invalid token" });
    }

    if (decoded.role !== "admin" && decoded.role !== "instructor") {
      return res.status(403).json({ message: "Only admin or instructor can update course" });
    }

    const oldCourse = await Course.findById(req.params.id);

    if (!oldCourse) {
      return res.status(404).json({ message: "Course not found" });
    }

    let updatedImages = oldCourse.images;

    if (req.files && req.files.length > 0) {
      updatedImages = req.files.map((file) => file.filename);
    }

    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        instructor: req.body.instructor,
        price: req.body.price,
        duration: req.body.duration,
        category: req.body.category,
        description: req.body.description,
        images: updatedImages,
      },
      { new: true }
    );

    res.status(200).json({
      message: "Course updated successfully",
      course: updatedCourse,
    });
  } catch (error) {
    res.status(500).json({ message: "Update failed", error: error.message });
  }
};

exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.find().sort({ createdAt: -1 });
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: "Fetch failed", error: error.message });
  }
};

exports.getSingleCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ message: "Single fetch failed", error: error.message });
  }
};

exports.searchCourse = async (req, res) => {
  try {
    const keyword = req.params.keyword;
    const courses = await Course.find({
      title: { $regex: keyword, $options: "i" },
    });
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: "Search failed", error: error.message });
  }
};

exports.deleteCourse = async (req, res) => {
  try {
    await Course.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Course deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Delete failed", error: error.message });
  }
};