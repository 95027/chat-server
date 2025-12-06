module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

  User.associate = (models) => {
    User.hasMany(models.Message, { foreignKey: "senderId" });

    User.belongsToMany(models.Conversation, {
      through: "ConversationMember",
      foreignKey: "userId",
      as: "conversations",
    });
  };

  return User;
};
