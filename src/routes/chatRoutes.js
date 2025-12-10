const { markChatAsRead, getChatUserList } = require("../controllers/chatController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = require("express").Router();

router.get("/user", authMiddleware, getChatUserList);
router.post("/mark-read", authMiddleware, markChatAsRead);

module.exports = router;
