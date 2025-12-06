module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define("Message", {
    conversationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    senderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    seen: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });

  Message.associate = (models) => {
    Message.belongsTo(models.Conversation, { foreignKey: "conversationId" });
    Message.belongsTo(models.User, { foreignKey: "senderId" });
  };

  return Message;
};
