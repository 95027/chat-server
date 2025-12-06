module.exports = (sequelize, DataTypes) => {
  const ConversationMember = sequelize.define("ConversationMember", {
    conversationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  return ConversationMember;
};
