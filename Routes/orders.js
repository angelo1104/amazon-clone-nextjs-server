import dotenv from "dotenv";
dotenv.config();

//imports
import express from "express";
import Order from "../mongoDB/Order.js";

//define router
const router = express.Router();

//middlewares

//routes
router.get("/", (req, res) => {
  res.json({
    message: "Hello hello hello order Kiyosaki here.",
  });
});

router.post("/create", (req, res) => {
  const { order } = req.body;

  const orderMade = new Order({ ...order });

  orderMade
    .save()
    .then((orderItem) => {
      res.status(200).json(orderItem);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Internal server error.",
      });
    });
});

router.post("/read", (req, res) => {
  const { filter } = req.body;
  Order.findOne({ ...filter }, (error, order) => {
    if (error) {
      console.log(error);
      res.status(500).json({
        message: "Internal Server Error.",
      });
    } else if (!order) {
      res.status(404).json({
        message: "No such order found.",
      });
    } else {
      res.status(200).json({
        ...order,
      });
    }
  });
});

router.post("/read-by-customer", (req, res) => {
  const { customerUid } = req.body;

  Order.find({ customerUid })
    .sort({ date: "ascending" })
    .exec((error, orders) => {
      if (error) {
        console.log(error);
        res.status(500).json({
          message: "Internal server error.",
        });
      } else if (!orders || !orders.length) {
        res.status(404).json({
          message: "No orders found.",
        });
      } else {
        res.status(200).json({
          ...orders,
        });
      }
    });
});

router.patch("/update-status", (req, res) => {
  const { filter, status } = req.body;

  Order.findOneAndUpdate(
    filter,
    {
      $set: {
        status: status,
      },
    },
    (error, order) => {
      if (error) {
        console.log(error);
        res.status(500).json({
          message: "Internal server error.",
        });
      } else if (!order) {
        res.status(404).json({
          message: "No such order",
        });
      } else {
        Order.findOne({ ...filter }, (error, updatedOrder) => {
          if (error) {
            console.log(error);
            res.status(500).json({
              message: "Internal server error.",
            });
          } else if (!updatedOrder) {
            res.status(404).json({
              message: "No such order",
            });
          } else {
            res.status(200).json({
              ...updatedOrder,
            });
          }
        });
      }
    }
  );
});

export default router;
