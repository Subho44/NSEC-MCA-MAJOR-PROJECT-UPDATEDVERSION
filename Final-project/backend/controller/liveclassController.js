const LiveClass = require("../models/Liveclass");

exports.createLiveClass = async (req, res) => {
  try {
    const { title, instructor, date, time } = req.body;
    const meetingLink = `https://meet.jit.si/${title.replace(/\s+/g, "").toLowerCase()}_${Date.now()}`;

    const liveClass = await LiveClass.create({
      title,
      instructor,
      date,
      time,
      meetingLink,
    });

    res.status(201).json({ message: "Live class created successfully", liveClass });
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
