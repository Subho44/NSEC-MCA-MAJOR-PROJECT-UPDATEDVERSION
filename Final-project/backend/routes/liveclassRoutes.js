const express = require("express");
const router = express.Router();
const liveClassController = require("../controller/liveclassController");

router.post("/", liveClassController.createLiveClass);
router.get("/", liveClassController.getLiveClasses);

module.exports = router;