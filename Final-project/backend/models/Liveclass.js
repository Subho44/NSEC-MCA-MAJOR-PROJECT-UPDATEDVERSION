const mongoose = require("mongoose");

const liveClassSchema = new mongoose.Schema(
  {
    title: String,
    instructor: String,
    date: String,
    time: String,
    meetingLink: String,
    createdBy: String,
    createdByRole: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("LiveClass", liveClassSchema);