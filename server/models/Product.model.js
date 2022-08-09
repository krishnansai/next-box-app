const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
  gsm: {
    type: String,
    required: true,
  },
  paper: {
    type: String,
    required: true,
  },
  how: {
    type: String,
    required: true,
  },
  image: {
    type: [String],
    required: true,
  },
  ordered_by: {
    type: [String],
    required: false,
    default: [],
  },
  total_orders: {
    type: Number,
    required: false,
  },
  category: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Product", ProductSchema);
