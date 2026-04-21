const express = require("express");
const router = express.Router();
const authController = require("../controller/userController");

router.post("/register", authController.registerUser);
router.post("/verify-otp", authController.verifyOtp);
router.post("/login", authController.loginUser);

module.exports = router;