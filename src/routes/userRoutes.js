const getAllUsers = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = require("express").Router();

router.get("/",authMiddleware, getAllUsers)

module.exports = router;