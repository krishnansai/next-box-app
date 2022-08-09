const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Entities = require("../models/entities/CommonEntities");

const { OrderStatus } = Entities;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  cart: {
    type: [String],
    required: false,
    default: [],
  },
  orders: {
    type: Object,
    default: {
      totalOrders: 0,
      orders: [
        {
          orderId: "",
          quantity: 0,
          productID: "",
          productName: "",
          orderDate: Date(),
          orderDate: OrderStatus.PENDING,
        },
      ],
    },
  },
  address: {
    type: String,
    default: "",
  },
  phone: {
    type: String,
    default: "",
  },
  postCode: {
    type: String,
    default: "",
  },
  state: {
    type: String,
    default: "",
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

userSchema.pre("updateOne", function (next) {
  // this.update({}, { $set: { updatedAt: Date.now() } });
  if (this.isModified("orders")) {
    this.update(
      {},
      {
        $set: {
          orders: {
            total_orders: this.orders.orders.length,
          },
        },
      }
    );
  }
  next();
});

userSchema.pre("save", function (next) {
  let user = this;
  if (user.isModified("password")) {
    user.password = bcrypt.hashSync(user.password, 10);
  }
  next();
});

userSchema.methods.ComparePassword = function (password) {
  let user = this;
  return bcrypt.compareSync(password, user.password);
};

userSchema.methods.CompareRole = function (role) {
  let user = this;
  return user.role === role;
};

module.exports = mongoose.model("User", userSchema);
