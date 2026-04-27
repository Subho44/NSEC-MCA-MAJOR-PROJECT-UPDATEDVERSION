const express = require("express");
const router = express.Router();
const chatctrl = require("../controller/chatController");

router.get("/users",chatctrl.getUsers);
router.get("/messages/:senderId/:receiverId",chatctrl.getMessages);

module.exports = router;