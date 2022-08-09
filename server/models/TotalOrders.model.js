const mongoose = require("mongoose");

const TotalOrders = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  orders: {
    type: [String],
    required: false,
    default: [],
  },
  totalPrice: {
    type: Number,
    required: false,
    default: 0,
  },
  totalQuantity: {
    type: Number,
    required: false,
    default: 0,
  },
  isActive: {
    type: Boolean,
    required: false,
    default: true,
  },
});

module.exports = mongoose.model("TotalOrders", TotalOrders);
