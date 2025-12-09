const {
  register,
  login,
  getUserByToken,
} = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = require("express").Router();

router.post("/register", register);
router.post("/login", login);
router.get("/profile", authMiddleware, getUserByToken);

module.exports = router;
