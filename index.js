const express = require("express");
const Razorpay = require("razorpay");
const app = express();

app.get("/", (req, res) => {
  res.send("<h1>Hola</h1>");
});

app.post("/order", async (req, res) => {
  const amount = req.body.amount;

  var instance = new Razorpay({
    key_id: "rzp_test_MQw8oQYkRvR2Yk",
    key_secret: "wrjX1oW79Gu5kFsoFIL3ahGw",
  });

  var options = {
    amount: amount * 100, //* 100 because currency comes in paise/lowest value
    currency: "INR",
    receipt: "receipt#1",
    notes: {
      key1: "value3",
      key2: "value2",
    },
  };

  const myOrder = await instance.orders.create(options);

  res.status(200).json({
    success: true,
    amount,
    myOrder,
  });
});

app.listen(4000, () => {
  console.log(`Server is listening on Port 4000...`);
});
