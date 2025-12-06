const fs = require("fs");
const path = require("path");
const sequelize = require("../../config/database");
const Sequelize = require("sequelize");

const db = {};

fs.readdirSync(__dirname)
  .filter((file) => file != "index.js" && file.endsWith(".js"))
  .forEach((file) => {
    const defineModel = require(path.join(__dirname, file));
    const model = defineModel(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) db[modelName].associate(db);
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
