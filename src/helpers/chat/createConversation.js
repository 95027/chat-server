const { Conversation, User, ConversationMember, sequelize } = require("../../models");

const getOrCreatePrivateConversation = async (userId1, userId2) => {
  const existing = await Conversation.findOne({
    where: { type: "private" },
    include: [
      {
        model: User,
        as: "members",
        where: { id: [userId1, userId2] },
        required: true,
        through: { attributes: [] },
      },
    ],
  });

  // Validate matched conversation: must have 2 members
  if (existing && existing.members.length === 2) {
    return existing;
  }

  // Otherwise create
  const conversation = await Conversation.create({ type: "private" });

  await ConversationMember.bulkCreate([
    { conversationId: conversation.id, userId: userId1 },
    { conversationId: conversation.id, userId: userId2 },
  ]);

  return conversation;
};

module.exports = getOrCreatePrivateConversation;
