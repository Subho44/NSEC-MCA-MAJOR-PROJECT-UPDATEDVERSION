const LiveClass = require("../models/Liveclass");
const jwt = require("jsonwebtoken");

exports.createLiveClass = async (req, res) => {
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
      return res.status(403).json({ message: "Only admin or instructor can create live class" });
    }

    const { title, instructor, date, time } = req.body;

    const meetingLink = `https://meet.jit.si/${title
      .replace(/\s+/g, "")
      .toLowerCase()}_${Date.now()}`;

    const liveClass = await LiveClass.create({
      title,
      instructor,
      date,
      time,
      meetingLink,
      createdBy: decoded.id,
      createdByRole: decoded.role,
    });

    res.status(201).json({
      message: "Live class created successfully",
      liveClass,
    });
  } catch (error) {
    res.status(500).json({ message: "Create live class failed", error: error.message });
  }
};

exports.getLiveClasses = async (req, res) => {
  try {
    const classes = await LiveClass.find().sort({ createdAt: -1 });
    res.status(200).json(classes);
  } catch (error) {
    res.status(500).json({ message: "Fetch live classes failed", error: error.message });
  }
};