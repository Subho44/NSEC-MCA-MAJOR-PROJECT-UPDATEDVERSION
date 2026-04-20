const express = require("express");
const router = express.Router();
const courseController = require("../controller/courseController");
const upload = require("../middleware/upload");

router.post("/", upload.array("images", 5), courseController.addcourse);
router.get("/", courseController.viewcourse);
router.get("/search/:keyword", courseController.searchcourse);
router.get("/:id", courseController.singelcourse);
router.delete("/:id", courseController.deletecourse);

module.exports = router;
