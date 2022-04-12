const express = require("express");
const Razorpay = require("razorpay");
const app = express();
app.use(express.static("./public"));
app.use(express.json())

// app.get("/", (req, res) => {
//   res.send("<h1>Hola</h1>");
// });

app.post("/order", async (req, res) => {
  const amount = req.body.amount;

  var instance = new Razorpay({
    key_id: "rzp_test_BFq32QMt1ugErN",
    key_secret: "1Z9nD7yPcbFUfp8rXuneBgSH",
  });

  var options = {
    amount: amount * 100, //* 100 because currency comes in paise/lowest value
    currency: "INR",
    receipt: "receipt#1"
  };

  const myOrder = await instance.orders.create(options);

  res.status(200).json({
    success: true,
    amount,
    order: myOrder,
  });
});

app.listen(4000, () => {
  console.log(`Server is listening on Port 4000...`);
});
