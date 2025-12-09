const getAllUsers = require("../controllers/userController");

const router = require("express").Router();

router.get("/", getAllUsers)

module.exports = router;