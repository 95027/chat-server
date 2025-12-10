const { Conversation, User, ConversationMember } = require("../../models");
const { Op } = require("sequelize");

const getOrCreatePrivateConversation = async (userId1, userId2) => {
  // Find all private conversations where one of the two users exists
  const candidates = await Conversation.findAll({
    where: { type: "private" },
    include: [
      {
        model: User,
        as: "members",
        attributes: ["id"],
        through: { attributes: [] },
      },
    ],
  });

  // Look for an existing conversation with exactly these two users
  for (const convo of candidates) {
    const memberIds = convo.members.map((m) => m.id).sort();
    const idsToMatch = [userId1, userId2].sort();

    if (
      memberIds.length === 2 &&
      memberIds[0] === idsToMatch[0] &&
      memberIds[1] === idsToMatch[1]
    ) {
      return convo; // Found existing private chat
    }
  }

  // Otherwise create new conversation
  const conversation = await Conversation.create({ type: "private" });

  await ConversationMember.bulkCreate([
    { conversationId: conversation.id, userId: userId1 },
    { conversationId: conversation.id, userId: userId2 },
  ]);

  return conversation;
};

module.exports = getOrCreatePrivateConversation;
