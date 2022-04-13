const express = require("express");
const Razorpay = require("razorpay");

const app = express();

app.use(express.static("./public"));
app.use(express.json());

app.post("/order", async (req, res) => {
  const amount = req.body.amount;

  var instance = new Razorpay({
    key_id: "rzp_test_BFq32QMt1ugErN",
    key_secret: "1Z9nD7yPcbFUfp8rXuneBgSH",
  });

  var options = {
    amount: amount * 100,
    currency: "INR",
    receipt: "receipt#1",
  };

  const myOrder = await instance.orders.create(options);

  res.status(200).json({
    success: true,
    amount: amount,
    order: myOrder,
  });
});

// Start the app
app.listen(4000, () => {
  console.log("Server is running at http://localhost:4000/");
});
