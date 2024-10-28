const Sequelize = require("sequelize");

const sequelize = new Sequelize("electron-order-system", "root", "00000000", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;