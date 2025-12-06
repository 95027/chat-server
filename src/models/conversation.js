module.exports = (sequelize, DataTypes) => {
  const Conversation = sequelize.define("Conversation", {
    type: {
      type: DataTypes.ENUM("private", "group"),
      defaultValue: "private",
    },
  });

  Conversation.associate = (models) => {
    Conversation.hasMany(models.Message, { foreignKey: "conversationId" });

    Conversation.belongsToMany(models.User, {
      through: "ConversationMember",
      foreignKey: "conversationId",
      as: "members",
    });
  };

  return Conversation;
};
