const express = require("express");
const router = express.Router();
const adminctrl = require("../controller/adminController");

router.get("/dashboard",adminctrl.getdashboarddata);

module.exports = router;