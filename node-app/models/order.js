const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const Order = sequelize.define("order", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: Sequelize.STRING,
  meal: Sequelize.STRING,
  extra: {
    type: Sequelize.STRING,
    allowNull: true,
  },
});

module.exports = Order;
