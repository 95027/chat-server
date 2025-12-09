const { User } = require("../models");

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ["password"] },
    });

    return res
      .status(200)
      .json({ message: "users fetched successfully", users });
  } catch (error) {
    next(error);
  }
};

module.exports = getAllUsers;
