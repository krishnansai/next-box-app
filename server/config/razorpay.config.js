const Razorpay = require("razorpay");

const razorpay = new Razorpay({
  key_id: process.env.RASOPAY_ID,
  key_secret: process.env.RASOPAY_SECRET,
});

module.exports = razorpay;
