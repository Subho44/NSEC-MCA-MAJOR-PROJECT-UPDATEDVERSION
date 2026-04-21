const express = require("express");
const router = express.Router();
const courseController = require("../controller/courseController");
const upload = require("../middleware/upload");

router.post("/", upload.array("images", 5), courseController.addCourse);
router.put("/:id", upload.array("images", 5), courseController.updateCourse);
router.get("/", courseController.getCourses);
router.get("/search/:keyword", courseController.searchCourse);
router.get("/:id", courseController.getSingleCourse);
router.delete("/:id", courseController.deleteCourse);

module.exports = router;