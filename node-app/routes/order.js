const express = require("express");
const OrderRouter = express.Router();
const Order = require("../models/order");

OrderRouter.post("/order", (req, res, next) => {
  console.log("create order");
  const name = req.body.name;
  const meal = req.body.meal;
  const extra = req.body.extra;

  /* 
    create vs build
    create auto finish 
    build have to manual finish
  */
  const orderInfo = {
    name: name,
    meal: meal,
    extra: extra,
  };
  if (!name || !meal) {
    return res.status(500).json({
      error: "name and meal is required!",
    });
  }
  Order.create(orderInfo)
    .then((result) => {
      console.log(result);
      // respone to frontend
      res.status(201).json({ message: "order created!", order: orderInfo });
    })
    .catch((err) => {
      // 处理创建订单期间的错误
      console.error("Error during order creation:", err);
      res.status(500).json({ error: "Server error during order creation." });
    });
});
module.exports = OrderRouter;
