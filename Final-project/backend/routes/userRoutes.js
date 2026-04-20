const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");

router.post("/register", userController.registerUser);
router.post("/verify-otp", userController.verifyOtp);
router.post("/login", userController.loginUser);

module.exports = router;
