const { Op } = require("sequelize");
const { Message, User, Conversation } = require("../models");

const getChatUserList = async (req, res, next) => {
  try {
    const myId = req.user.id;

    const users = await User.findAll({
      where: { id: { [Op.ne]: myId } },
      attributes: ["id", "name", "email"],
      raw: true,
    });

    const conversations = await Conversation.findAll({
      include: [
        {
          model: User,
          as: "members",
          attributes: ["id", "name"],
        },
        {
          model: Message,
          attributes: ["id", "senderId", "seen"],
        },
      ],
    });

    const result = users.map((u) => {
      // Find conversation with this user
      const convo = conversations.find(
        (c) =>
          c.members.some((m) => m.id === myId) &&
          c.members.some((m) => m.id === u.id)
      );

      const conversationId = convo ? convo.id : null;

      // Count unread messages from this user
      const unreadCount = convo
        ? convo.Messages.filter((m) => m.senderId === u.id && !m.seen).length
        : 0;

      return {
        ...u,
        conversationId,
        unreadCount,
      };
    });

    res
      .status(200)
      .json({ message: "users fetched successfully", users: result });
  } catch (error) {
    next(error);
  }
};

const markChatAsRead = async (req, res, next) => {
  try {
    const { conversationId } = req.body;
    const userId = req.user.id;

    await Message.update(
      { seen: true },
      {
        where: {
          conversationId,
          senderId: { [Op.ne]: userId },
          seen: false,
        },
      }
    );

    res.status(200).json({ message: "Messages marked as read" });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  markChatAsRead,
  getChatUserList,
};
