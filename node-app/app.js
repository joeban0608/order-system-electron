const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./util/database");
const OrderRouter = require("./routes/order");

// const todoRoutes = require("./routes/todos");

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  console.log("Some middleware!");
  next();
});

app.use(OrderRouter);

sequelize
  // .sync({ force: true }) // {force: true} 用來查看每次 db 的動作
  .sync()
  .then((res) => {
    console.log("sequelize success! start server 8000");
    app.listen(8000);
    // console.log("res", res);
  })
  .catch((err) => console.log("sequelize mySql err:", err));
